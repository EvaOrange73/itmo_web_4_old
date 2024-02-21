package web_4;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class MyUser {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;

    public MyUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public MyUser() {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
