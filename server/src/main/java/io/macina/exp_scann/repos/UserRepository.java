package io.macina.exp_scann.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.macina.exp_scann.model.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Integer> {

    Optional<AppUser> findByUsername(String name);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
