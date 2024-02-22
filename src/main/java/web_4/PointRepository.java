package web_4;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

public interface PointRepository extends CrudRepository<Point, Long> {

    Point save(Point point);
    Iterable<Point> findAll();
}
