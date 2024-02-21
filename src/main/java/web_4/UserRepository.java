package web_4;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<MyUser, Long> {
    MyUser save (MyUser user);

    MyUser findByUsername (String username);
}
