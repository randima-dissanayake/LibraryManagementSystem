package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Optional<Transaction> findById(Integer id) {
        return transactionRepository.findById(id);
    }

    @Override
    public List<Transaction> findByUserId(Integer id) {
        return transactionRepository.findByUserId(id);
    }

    @Override
    public List<Transaction> findByBookId(Integer id) {
        return transactionRepository.findByBookId(id);
    }
}
