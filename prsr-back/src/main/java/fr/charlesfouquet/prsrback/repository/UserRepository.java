package fr.charlesfouquet.prsrback.repository;

import fr.charlesfouquet.prsrback.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
