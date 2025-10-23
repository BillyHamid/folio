import 'package:flutter/foundation.dart';
import '../models/account.dart';
import '../models/transaction.dart';
import '../models/card.dart';
import '../services/banking_service.dart';

class BankingProvider with ChangeNotifier {
  final BankingService _bankingService = BankingService();

  List<Account> _accounts = [];
  List<Transaction> _transactions = [];
  List<BankCard> _cards = [];
  bool _isLoading = false;
  String? _error;

  List<Account> get accounts => _accounts;
  List<Transaction> get transactions => _transactions;
  List<BankCard> get cards => _cards;
  bool get isLoading => _isLoading;
  String? get error => _error;

  double get totalBalance {
    return _accounts.fold(0.0, (sum, account) => sum + account.balance);
  }

  Future<void> loadUserData(String userId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final futures = await Future.wait([
        _bankingService.getUserAccounts(userId),
        _bankingService.getAllUserTransactions(userId),
        _bankingService.getUserCards(userId),
      ]);

      _accounts = futures[0] as List<Account>;
      _transactions = futures[1] as List<Transaction>;
      _cards = futures[2] as List<BankCard>;

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<List<Transaction>> getAccountTransactions(String accountId) async {
    try {
      return await _bankingService.getAccountTransactions(accountId);
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return [];
    }
  }

  Future<bool> transferMoney(String fromAccountId, String toAccountId,
      double amount, String description) async {
    _isLoading = true;
    notifyListeners();

    try {
      final success = await _bankingService.transferMoney(
        fromAccountId, toAccountId, amount, description);
      
      if (success) {
        // Reload data to reflect changes
        final userId = _accounts.first.userId;
        await loadUserData(userId);
      }

      _isLoading = false;
      notifyListeners();
      return success;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  List<Transaction> getRecentTransactions({int limit = 5}) {
    return _transactions.take(limit).toList();
  }

  List<Transaction> getTransactionsByCategory(TransactionCategory category) {
    return _transactions
        .where((transaction) => transaction.category == category)
        .toList();
  }

  double getMonthlySpending() {
    final now = DateTime.now();
    final startOfMonth = DateTime(now.year, now.month, 1);
    
    return _transactions
        .where((transaction) => 
            transaction.type == TransactionType.expense &&
            transaction.date.isAfter(startOfMonth))
        .fold(0.0, (sum, transaction) => sum + transaction.amount);
  }

  double getMonthlyIncome() {
    final now = DateTime.now();
    final startOfMonth = DateTime(now.year, now.month, 1);
    
    return _transactions
        .where((transaction) => 
            transaction.type == TransactionType.income &&
            transaction.date.isAfter(startOfMonth))
        .fold(0.0, (sum, transaction) => sum + transaction.amount);
  }
}