package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Book;
import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.model.User;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Transaction saveTransaction(Transaction transaction);
    Transaction findById(Integer id);
    List<Transaction> findByUniversityId(Integer id);
    List<Transaction> findByBookId(Integer id);
    List<Book> getCurrentBookListByUserId(Integer id);
    List<User> getUserListByBookId(Integer id);
    List<Transaction> findAll();
    Transaction updateTransaction(Transaction transaction);
    Transaction returnBook(Integer id);
    Transaction renewTransaction(Integer id);
    List<Transaction> getFineNotReturned();
}
