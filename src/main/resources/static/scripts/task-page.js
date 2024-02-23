Vue.component('points-table', {
    props: ['points'],
    template: '<table>\n' +
        '                <thead>\n' +
        '                <tr>\n' +
        '                    <th>X</th>\n' +
        '                    <th>Y</th>\n' +
        '                    <th>R</th>\n' +
        '                    <th>Результат</th>\n' +
        '                    <th>Время отправки запроса</th>\n' +
        '                    <th>Время работы скрипта</th>\n' +
        '                </tr>\n' +
        '                </thead>\n' +
        '                <tbody id="table">\n' +
        '                <tr v-for="point in points">\n' +
        '                    <td>{{ point.x }}</td>\n' +
        '                    <td>{{ point.y }}</td>\n' +
        '                    <td>{{ point.r }}</td>\n' +
        '\n' +
        '                    <td v-if="point.result" class="green"> Точка попадает в область</td>\n' +
        '                    <td v-else class="red"> Точка не попадает в область</td>\n' +
        '\n' +
        '                    <td>{{ point.requestTime }}</td>\n' +
        '                    <td>{{ point.processTime }}</td>\n' +
        '                </tr>\n' +
        '                </tbody>\n' +
        '            </table>',
    mounted() {
        this.$root.getPoints();
    }
})

Vue.component('point-form', {
    data: function () {
        return {
            x: undefined,
            y: undefined,
            r: undefined,
            xError: undefined,
            yError: undefined,
            rError: undefined,
            rValues: [
                {value: -4, class: 'small-button'},
                {value: -3, class: 'small-button'},
                {value: -2, class: 'small-button'},
                {value: -1, class: 'small-button'},
                {value: 0, class: 'small-button'},
                {value: 1, class: 'small-button'},
                {value: 2, class: 'small-button'},
                {value: 3, class: 'small-button'},
                {value: 4, class: 'small-button'},
            ],
        }
    },
    methods: {
        press(r) {
            this.r = r.value;
            for (let other of this.rValues) {
                other['class'] = 'small-button';
            }
            r['class'] = 'small-button-pressed';
        },
        submit() {
            if (this.validateX() & this.validateY() & this.validateR()) {
                this.$root.postPoint(this.x, this.y, this.r);
            }
        },
        validateX() {
            this.xError = undefined;
            let x = parseFloat(this.x);
            if (x && x >= -5 && x <= 3)
                return true;
            this.xError = 'Введите число от -5 до 3';
        },
        validateY() {
            this.yError = undefined;
            let y = parseFloat(this.y);
            if (y && y >= -4 && y <= 4)
                return true;
            this.yError = 'Введите число от -4 до 4';
        },
        validateR() {
            this.rError = undefined;
            if (this.r)
                return true;
            this.rError = 'Выберите радиус';
        }
    },
    template: '<div><div>\n' +
        '                                <label for="x">X:</label>\n' +
        '                                <input type="text" id="x" class="input" v-model="x">\n' +
        '                                <p class="errorMessage">{{xError}}</p>\n' +
        '                            </div>\n' +
        '                            <div>\n' +
        '                                <label for="x">Y:</label>\n' +
        '                                <input type="text" id="y" class="input" v-model="y">\n' +
        '                                <p class="errorMessage">{{yError}}</p>\n' +
        '                            </div>\n' +
        '                            <div>\n' +
        '                                <label>R:</label>\n' +
        '                                <div>\n' +
        '                                    <input type="button"\n' +
        '                                           v-for="r in rValues"\n' +
        '                                           v-bind:class="r.class"\n' +
        '                                           v-bind:value="r.value"\n' +
        '                                           v-on:click="press(r)"\n' +
        '                                    >\n' +
        '                                </div>\n' +
        '                                <p class="errorMessage">{{rError}}</p>\n' +
        '                            </div>\n' +
        '                            <div style="clear: both">\n' +
        '                                <input type="submit" value="Отправить" class="small-button" v-on:click="submit()">\n' +
        '                            </div></div>'
})

var app = new Vue({
    el: '#app',
    data: {points: []},
    methods: {
        getPoints() {
            axios.get('/task/points')
                .then(response => (this.points = response.data));
        },
        postPoint(x, y, r) {
            let json = JSON.stringify({
                x: x,
                y: y,
                r: r
            });
            axios.post('/task/points', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.getPoints();
            })

        }
    }
})
