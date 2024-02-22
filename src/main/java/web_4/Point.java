package web_4;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Point {

    @Id
    @GeneratedValue
    private Long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private long requestTime;
    private long processTime;

}
