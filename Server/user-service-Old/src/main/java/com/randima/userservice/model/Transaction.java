package com.randima.userservice.model;

import lombok.Data;

@Data
public class Transaction {
    private Integer id;
    private Integer bookId;
    private Integer userId;
    private String checkout_date;
    private Integer renew_flag;
    private Integer fine;

}
