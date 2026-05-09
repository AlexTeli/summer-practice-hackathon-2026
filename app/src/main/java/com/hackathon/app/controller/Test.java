package com.hackathon.app.controller;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Test {

    @PostConstruct
    public void init() {
        System.out.println("TEST CONTROLLER LOADED");
    }
    @GetMapping("/hello")
    public String hello(HttpServletRequest request) {
        System.out.println("HIT /api/hello");
        return "Backend works 🚀";
    }
}
