package fr.charlesfouquet.prsrback.services;

import fr.charlesfouquet.prsrback.beans.User;
import fr.charlesfouquet.prsrback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public User findById(int id) {
        Optional<User> userToDelete = userRepository.findById(id);
        if (userToDelete.isPresent()) {
            return userToDelete.get();
        }
        return null;
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

    public boolean mailExists(User user) {
        Optional<User> userToFind = userRepository.findByEmail(user.getEmail());
        if (userToFind.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

}
