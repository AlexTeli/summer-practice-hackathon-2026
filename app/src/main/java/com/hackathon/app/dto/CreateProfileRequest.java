package com.hackathon.app.dto;

import java.util.List;

public class CreateProfileRequest {
    public String bio;
    public String profilePictureUrl;
    public int skillLevel;
    public List<Long> sportIds;
}