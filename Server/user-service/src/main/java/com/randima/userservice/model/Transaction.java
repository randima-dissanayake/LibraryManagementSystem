package com.randima.userservice.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Transaction {
    private Integer id;
    private Integer bookId;
    private Integer universityId;
    private LocalDate checkin_date;
    private String checkout_date;
    private Integer renew_flag;
    private Integer fine;
    private boolean isReturned;
    private LocalDate returnedDate;
}
