package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Transaction;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Transaction saveTransaction(Transaction transaction);
    Optional<Transaction> findById(Integer id);
    List<Transaction> findByUserId(Integer id);
    List<Transaction> findByBookId(Integer id);
}
