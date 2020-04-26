package com.randima.transactionservice.repository;

import com.randima.transactionservice.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    List<Transaction> findByUniversityId(Integer id);
    List<Transaction> findByBookId(Integer id);
    @Query(value = "SELECT * FROM Transaction t WHERE t.fine>0 AND t.isReturned = false ", nativeQuery = true)
    List<Transaction> findAllFine();
}
