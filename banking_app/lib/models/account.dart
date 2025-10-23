enum AccountType {
  checking,
  savings,
  credit,
  investment,
}

class Account {
  final String id;
  final String userId;
  final String accountNumber;
  final AccountType type;
  final String name;
  final double balance;
  final String currency;
  final DateTime createdAt;
  final bool isActive;

  Account({
    required this.id,
    required this.userId,
    required this.accountNumber,
    required this.type,
    required this.name,
    required this.balance,
    this.currency = 'EUR',
    required this.createdAt,
    this.isActive = true,
  });

  String get formattedBalance {
    return '${balance.toStringAsFixed(2)} $currency';
  }

  String get accountTypeString {
    switch (type) {
      case AccountType.checking:
        return 'Compte Courant';
      case AccountType.savings:
        return 'Compte Épargne';
      case AccountType.credit:
        return 'Carte de Crédit';
      case AccountType.investment:
        return 'Compte Investissement';
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'accountNumber': accountNumber,
      'type': type.toString(),
      'name': name,
      'balance': balance,
      'currency': currency,
      'createdAt': createdAt.toIso8601String(),
      'isActive': isActive,
    };
  }

  factory Account.fromJson(Map<String, dynamic> json) {
    return Account(
      id: json['id'],
      userId: json['userId'],
      accountNumber: json['accountNumber'],
      type: AccountType.values.firstWhere(
        (e) => e.toString() == json['type'],
      ),
      name: json['name'],
      balance: json['balance'].toDouble(),
      currency: json['currency'] ?? 'EUR',
      createdAt: DateTime.parse(json['createdAt']),
      isActive: json['isActive'] ?? true,
    );
  }

  Account copyWith({
    String? id,
    String? userId,
    String? accountNumber,
    AccountType? type,
    String? name,
    double? balance,
    String? currency,
    DateTime? createdAt,
    bool? isActive,
  }) {
    return Account(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      accountNumber: accountNumber ?? this.accountNumber,
      type: type ?? this.type,
      name: name ?? this.name,
      balance: balance ?? this.balance,
      currency: currency ?? this.currency,
      createdAt: createdAt ?? this.createdAt,
      isActive: isActive ?? this.isActive,
    );
  }
}