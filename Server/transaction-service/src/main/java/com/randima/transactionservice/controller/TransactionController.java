package com.randima.transactionservice.controller;

import com.randima.transactionservice.model.Book;
import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.model.User;
import com.randima.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaction")
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public Transaction saveTransaction(@RequestBody Transaction transaction){
        transaction.setCheckin_date(LocalDate.now());
        transaction.setCheckout_date(LocalDate.now().plusDays(14));
        transaction.setRenew_flag(0);
        transaction.setFine(0);
        transaction.setReturned(false);
        transaction.setReturnedDate(null);
        return transactionService.saveTransaction(transaction);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Transaction findById(@PathVariable Integer id){
        return transactionService.findById(id);
    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<Transaction> findAll(){
        return transactionService.findAll();
    }

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public List<Transaction> findByUniversityId(@PathVariable Integer id){
        return transactionService.findByUniversityId(id);
    }

    @RequestMapping(value = "/user/currentbooks/{id}",method = RequestMethod.GET)
    public List<Book> getCurrentBookListByUserId(@PathVariable Integer id){
        return transactionService.getCurrentBookListByUserId(id);
    }

    @RequestMapping(value = "/book/{id}",method = RequestMethod.GET)
    public List<Transaction> findByBookId(@PathVariable Integer id){
        return transactionService.findByBookId(id);
    }

    @RequestMapping(value = "/book/currentusers/{id}",method = RequestMethod.GET)
    public List<User> getUserListByBookId(@PathVariable Integer id){
        return transactionService.getUserListByBookId(id);
    }

    @RequestMapping(value = "/renew/{id}",method = RequestMethod.GET)
    public Transaction updateRenewFlag(@PathVariable Integer id){
        return transactionService.renewTransaction(id);
    }

    @RequestMapping(value = "/return/{id}",method = RequestMethod.GET)
    public Transaction updateReturnBook(@PathVariable Integer id){
        return transactionService.returnBook(id);
    }

    @RequestMapping(value = "/fine/notreturned",method = RequestMethod.GET)
    public List<Transaction> getFineNotReturned(){
        return transactionService.getFineNotReturned();
    }

}
