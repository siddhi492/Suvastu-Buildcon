package com.suvastu.controller;

import com.suvastu.model.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/api/contact")
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactForm form) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("suvastubuildcon3@gmail.com");
            message.setTo("suvastubuildcon3@gmail.com");
            message.setSubject("Contact Form Message from " + form.getName());
            message.setText(
                "Name: " + form.getName() + "\n" +
                "Email: " + form.getEmail() + "\n" +
                "Message: \n" + form.getMessage()
            );

            mailSender.send(message);
            return ResponseEntity.ok("Message sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message.");
        }
    }
}
