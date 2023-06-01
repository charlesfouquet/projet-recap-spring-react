package fr.charlesfouquet.prsrback.services;

import fr.charlesfouquet.prsrback.beans.User;
import fr.charlesfouquet.prsrback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // C ////////////////////
    public boolean create(User user) {
        if (userRepository.save(user) != null) {
            return true;
        } else {
            return false;
        }
    }

    // R ////////////////////
    public List<User> read() {
       return userRepository.findAll();
    }

    // U ////////////////////
    public boolean update(User user) {
        User userToUpdate = userRepository.findById(user.getId()).get();
        if (userToUpdate != null) {
            userToUpdate.setNom(user.getNom());
            userToUpdate.setPrenom(user.getPrenom());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setPassword(user.getPassword());
            if (userRepository.save(user) != null) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // D ////////////////////
    public boolean delete(User user) {
        User userToUpdate = userRepository.findById(user.getId()).get();
        if (userToUpdate != null) {
            userRepository.delete(userToUpdate);
            if (userRepository.findById(user.getId()).isEmpty()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
