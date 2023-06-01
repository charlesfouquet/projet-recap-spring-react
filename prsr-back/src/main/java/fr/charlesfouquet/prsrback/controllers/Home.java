package fr.charlesfouquet.prsrback.controllers;

import fr.charlesfouquet.prsrback.beans.User;
import fr.charlesfouquet.prsrback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Home {
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<String> ajout(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        if (userService.create(user)) {
            return new ResponseEntity<String>("L'utilisateur " + user.getPrenom() + " " + user.getNom() + " a bien été créé !", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<String>("Une erreur est survenue", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public List<User> home(User user) {
        return userService.read();
    }

    @PutMapping("/")
    public ResponseEntity<String> update(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        if (userService.update(user)) {
            return new ResponseEntity<String>("L'utilisateur " + user.getPrenom() + " " + user.getNom() + " a bien été mis à jour !", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<String>("Une erreur est survenue", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<String> delete(@RequestBody User user) {
        if (userService.delete(user)) {
            return new ResponseEntity<String>("L'utilisateur " + user.getPrenom() + " " + user.getNom() + " a bien été supprimé !", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<String>("Une erreur est survenue", HttpStatus.BAD_REQUEST);
        }
    }
}
