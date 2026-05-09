package com.hackathon.app.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateProfileRequest {
    private String bio;
    private String profilePictureUrl;
    private int skillLevel;
    private List<Long> sportIds;
}