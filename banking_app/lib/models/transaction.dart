enum TransactionType {
  income,
  expense,
  transfer,
}

enum TransactionCategory {
  salary,
  shopping,
  food,
  transport,
  entertainment,
  bills,
  healthcare,
  education,
  investment,
  transfer,
  other,
}

class Transaction {
  final String id;
  final String accountId;
  final String title;
  final String description;
  final double amount;
  final TransactionType type;
  final TransactionCategory category;
  final DateTime date;
  final String? recipientName;
  final String? recipientAccount;

  Transaction({
    required this.id,
    required this.accountId,
    required this.title,
    required this.description,
    required this.amount,
    required this.type,
    required this.category,
    required this.date,
    this.recipientName,
    this.recipientAccount,
  });

  String get formattedAmount {
    final sign = type == TransactionType.income ? '+' : '-';
    return '$sign${amount.toStringAsFixed(2)} €';
  }

  String get categoryString {
    switch (category) {
      case TransactionCategory.salary:
        return 'Salaire';
      case TransactionCategory.shopping:
        return 'Achats';
      case TransactionCategory.food:
        return 'Alimentation';
      case TransactionCategory.transport:
        return 'Transport';
      case TransactionCategory.entertainment:
        return 'Divertissement';
      case TransactionCategory.bills:
        return 'Factures';
      case TransactionCategory.healthcare:
        return 'Santé';
      case TransactionCategory.education:
        return 'Éducation';
      case TransactionCategory.investment:
        return 'Investissement';
      case TransactionCategory.transfer:
        return 'Virement';
      case TransactionCategory.other:
        return 'Autre';
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'accountId': accountId,
      'title': title,
      'description': description,
      'amount': amount,
      'type': type.toString(),
      'category': category.toString(),
      'date': date.toIso8601String(),
      'recipientName': recipientName,
      'recipientAccount': recipientAccount,
    };
  }

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      accountId: json['accountId'],
      title: json['title'],
      description: json['description'],
      amount: json['amount'].toDouble(),
      type: TransactionType.values.firstWhere(
        (e) => e.toString() == json['type'],
      ),
      category: TransactionCategory.values.firstWhere(
        (e) => e.toString() == json['category'],
      ),
      date: DateTime.parse(json['date']),
      recipientName: json['recipientName'],
      recipientAccount: json['recipientAccount'],
    );
  }

  Transaction copyWith({
    String? id,
    String? accountId,
    String? title,
    String? description,
    double? amount,
    TransactionType? type,
    TransactionCategory? category,
    DateTime? date,
    String? recipientName,
    String? recipientAccount,
  }) {
    return Transaction(
      id: id ?? this.id,
      accountId: accountId ?? this.accountId,
      title: title ?? this.title,
      description: description ?? this.description,
      amount: amount ?? this.amount,
      type: type ?? this.type,
      category: category ?? this.category,
      date: date ?? this.date,
      recipientName: recipientName ?? this.recipientName,
      recipientAccount: recipientAccount ?? this.recipientAccount,
    );
  }
}