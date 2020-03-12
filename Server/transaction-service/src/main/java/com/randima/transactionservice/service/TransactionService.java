package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Book;
import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.model.User;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Transaction saveTransaction(Transaction transaction);
    Optional<Transaction> findById(Integer id);
    List<Transaction> findByUserId(Integer id);
    List<Transaction> findByBookId(Integer id);
    List<Book> getCurrentBookListByUserId(Integer id);
    List<User> getUserListByBookId(Integer id);
}
