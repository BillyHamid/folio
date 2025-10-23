import '../models/account.dart';
import '../models/transaction.dart';
import '../models/card.dart';

class BankingService {
  // Sample data for demonstration
  static final List<Account> _accounts = [
    Account(
      id: '1',
      userId: '1',
      accountNumber: 'FR76 1234 5678 9012 3456 78',
      type: AccountType.checking,
      name: 'Compte Courant Principal',
      balance: 2450.75,
      createdAt: DateTime.now().subtract(const Duration(days: 365)),
    ),
    Account(
      id: '2',
      userId: '1',
      accountNumber: 'FR76 9876 5432 1098 7654 32',
      type: AccountType.savings,
      name: 'Livret A',
      balance: 15000.00,
      createdAt: DateTime.now().subtract(const Duration(days: 200)),
    ),
    Account(
      id: '3',
      userId: '1',
      accountNumber: 'FR76 1111 2222 3333 4444 55',
      type: AccountType.credit,
      name: 'Carte de Crédit',
      balance: -850.25,
      createdAt: DateTime.now().subtract(const Duration(days: 100)),
    ),
  ];

  static final List<Transaction> _transactions = [
    Transaction(
      id: '1',
      accountId: '1',
      title: 'Salaire',
      description: 'Virement salaire mensuel',
      amount: 3500.00,
      type: TransactionType.income,
      category: TransactionCategory.salary,
      date: DateTime.now().subtract(const Duration(days: 5)),
    ),
    Transaction(
      id: '2',
      accountId: '1',
      title: 'Carrefour',
      description: 'Courses alimentaires',
      amount: 85.50,
      type: TransactionType.expense,
      category: TransactionCategory.food,
      date: DateTime.now().subtract(const Duration(days: 2)),
    ),
    Transaction(
      id: '3',
      accountId: '1',
      title: 'Netflix',
      description: 'Abonnement mensuel',
      amount: 15.99,
      type: TransactionType.expense,
      category: TransactionCategory.entertainment,
      date: DateTime.now().subtract(const Duration(days: 1)),
    ),
    Transaction(
      id: '4',
      accountId: '1',
      title: 'Virement vers Livret A',
      description: 'Épargne mensuelle',
      amount: 500.00,
      type: TransactionType.transfer,
      category: TransactionCategory.transfer,
      date: DateTime.now().subtract(const Duration(days: 3)),
      recipientName: 'Livret A',
      recipientAccount: 'FR76 9876 5432 1098 7654 32',
    ),
    Transaction(
      id: '5',
      accountId: '1',
      title: 'RATP',
      description: 'Pass Navigo mensuel',
      amount: 84.10,
      type: TransactionType.expense,
      category: TransactionCategory.transport,
      date: DateTime.now().subtract(const Duration(days: 7)),
    ),
  ];

  static final List<BankCard> _cards = [
    BankCard(
      id: '1',
      accountId: '1',
      cardNumber: '4532123456789012',
      holderName: 'JEAN DUPONT',
      expiryDate: DateTime(2027, 12, 31),
      cvv: '123',
      type: CardType.debit,
      brand: CardBrand.visa,
    ),
    BankCard(
      id: '2',
      accountId: '3',
      cardNumber: '5555123456789012',
      holderName: 'JEAN DUPONT',
      expiryDate: DateTime(2026, 8, 31),
      cvv: '456',
      type: CardType.credit,
      brand: CardBrand.mastercard,
      creditLimit: 3000.00,
      availableCredit: 2149.75,
    ),
  ];

  Future<List<Account>> getUserAccounts(String userId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _accounts.where((account) => account.userId == userId).toList();
  }

  Future<List<Transaction>> getAccountTransactions(String accountId) async {
    await Future.delayed(const Duration(milliseconds: 300));
    return _transactions
        .where((transaction) => transaction.accountId == accountId)
        .toList()
      ..sort((a, b) => b.date.compareTo(a.date));
  }

  Future<List<Transaction>> getAllUserTransactions(String userId) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final userAccountIds = _accounts
        .where((account) => account.userId == userId)
        .map((account) => account.id)
        .toList();

    return _transactions
        .where((transaction) => userAccountIds.contains(transaction.accountId))
        .toList()
      ..sort((a, b) => b.date.compareTo(a.date));
  }

  Future<List<BankCard>> getUserCards(String userId) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final userAccountIds = _accounts
        .where((account) => account.userId == userId)
        .map((account) => account.id)
        .toList();

    return _cards
        .where((card) => userAccountIds.contains(card.accountId))
        .toList();
  }

  Future<bool> transferMoney(String fromAccountId, String toAccountId,
      double amount, String description) async {
    await Future.delayed(const Duration(seconds: 2));

    // Find accounts
    final fromAccount = _accounts.firstWhere((acc) => acc.id == fromAccountId);
    final toAccount = _accounts.firstWhere((acc) => acc.id == toAccountId);

    // Check if sufficient funds
    if (fromAccount.balance < amount) {
      return false;
    }

    // Update balances
    final fromIndex = _accounts.indexWhere((acc) => acc.id == fromAccountId);
    final toIndex = _accounts.indexWhere((acc) => acc.id == toAccountId);

    _accounts[fromIndex] = fromAccount.copyWith(
      balance: fromAccount.balance - amount,
    );
    _accounts[toIndex] = toAccount.copyWith(
      balance: toAccount.balance + amount,
    );

    // Add transactions
    final now = DateTime.now();
    _transactions.addAll([
      Transaction(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        accountId: fromAccountId,
        title: 'Virement sortant',
        description: description,
        amount: amount,
        type: TransactionType.transfer,
        category: TransactionCategory.transfer,
        date: now,
        recipientName: toAccount.name,
        recipientAccount: toAccount.accountNumber,
      ),
      Transaction(
        id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
        accountId: toAccountId,
        title: 'Virement entrant',
        description: description,
        amount: amount,
        type: TransactionType.income,
        category: TransactionCategory.transfer,
        date: now,
        recipientName: fromAccount.name,
        recipientAccount: fromAccount.accountNumber,
      ),
    ]);

    return true;
  }

  Future<double> getTotalBalance(String userId) async {
    final accounts = await getUserAccounts(userId);
    return accounts.fold<double>(0.0, (sum, account) => sum + account.balance);
  }
}