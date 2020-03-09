package com.randima.transactionservice.controller;

import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public Transaction saveTransaction(@RequestBody Transaction transaction){
        return transactionService.saveTransaction(transaction);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Optional<Transaction> findById(@PathVariable Integer id){
        return transactionService.findById(id);
    }

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public List<Transaction> findByUserId(@PathVariable Integer id){
        return transactionService.findByUserId(id);
    }

    @RequestMapping(value = "/book/{id}",method = RequestMethod.GET)
    public List<Transaction> findByBookId(@PathVariable Integer id){
        return transactionService.findByBookId(id);
    }
}
