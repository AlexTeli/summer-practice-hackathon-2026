package com.hackathon.app.service;

import com.hackathon.app.entity.TimeSlot;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

public class TimeValidator {

    public static boolean isValid(TimeSlot slot, LocalDate date) {

        DayOfWeek day = date.getDayOfWeek();

        switch (slot) {

            case MORNING:
                // doar weekend
                return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;

            case AFTERNOON:
                return true;

            case EVENING:
                return true;

            default:
                return false;
        }
    }
}