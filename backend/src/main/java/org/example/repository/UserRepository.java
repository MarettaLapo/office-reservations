package org.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.example.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User searchById(Long id);

    User findByUsername(String username);

    boolean existsByUsername(String username);
    @Query("select u from User u where u.role!='ROLE_ADMIN'")
    List<User> searchAll();
}
