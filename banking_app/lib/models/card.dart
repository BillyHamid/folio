enum CardType {
  debit,
  credit,
}

enum CardBrand {
  visa,
  mastercard,
  americanExpress,
}

class BankCard {
  final String id;
  final String accountId;
  final String cardNumber;
  final String holderName;
  final DateTime expiryDate;
  final String cvv;
  final CardType type;
  final CardBrand brand;
  final double creditLimit;
  final double availableCredit;
  final bool isActive;
  final bool isBlocked;

  BankCard({
    required this.id,
    required this.accountId,
    required this.cardNumber,
    required this.holderName,
    required this.expiryDate,
    required this.cvv,
    required this.type,
    required this.brand,
    this.creditLimit = 0.0,
    this.availableCredit = 0.0,
    this.isActive = true,
    this.isBlocked = false,
  });

  String get maskedCardNumber {
    if (cardNumber.length >= 4) {
      final lastFour = cardNumber.substring(cardNumber.length - 4);
      return '**** **** **** $lastFour';
    }
    return cardNumber;
  }

  String get formattedExpiryDate {
    return '${expiryDate.month.toString().padLeft(2, '0')}/${expiryDate.year.toString().substring(2)}';
  }

  String get brandName {
    switch (brand) {
      case CardBrand.visa:
        return 'Visa';
      case CardBrand.mastercard:
        return 'Mastercard';
      case CardBrand.americanExpress:
        return 'American Express';
    }
  }

  String get typeName {
    switch (type) {
      case CardType.debit:
        return 'Carte de Débit';
      case CardType.credit:
        return 'Carte de Crédit';
    }
  }

  bool get isExpired {
    final now = DateTime.now();
    return expiryDate.isBefore(DateTime(now.year, now.month));
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'accountId': accountId,
      'cardNumber': cardNumber,
      'holderName': holderName,
      'expiryDate': expiryDate.toIso8601String(),
      'cvv': cvv,
      'type': type.toString(),
      'brand': brand.toString(),
      'creditLimit': creditLimit,
      'availableCredit': availableCredit,
      'isActive': isActive,
      'isBlocked': isBlocked,
    };
  }

  factory BankCard.fromJson(Map<String, dynamic> json) {
    return BankCard(
      id: json['id'],
      accountId: json['accountId'],
      cardNumber: json['cardNumber'],
      holderName: json['holderName'],
      expiryDate: DateTime.parse(json['expiryDate']),
      cvv: json['cvv'],
      type: CardType.values.firstWhere(
        (e) => e.toString() == json['type'],
      ),
      brand: CardBrand.values.firstWhere(
        (e) => e.toString() == json['brand'],
      ),
      creditLimit: json['creditLimit']?.toDouble() ?? 0.0,
      availableCredit: json['availableCredit']?.toDouble() ?? 0.0,
      isActive: json['isActive'] ?? true,
      isBlocked: json['isBlocked'] ?? false,
    );
  }

  BankCard copyWith({
    String? id,
    String? accountId,
    String? cardNumber,
    String? holderName,
    DateTime? expiryDate,
    String? cvv,
    CardType? type,
    CardBrand? brand,
    double? creditLimit,
    double? availableCredit,
    bool? isActive,
    bool? isBlocked,
  }) {
    return BankCard(
      id: id ?? this.id,
      accountId: accountId ?? this.accountId,
      cardNumber: cardNumber ?? this.cardNumber,
      holderName: holderName ?? this.holderName,
      expiryDate: expiryDate ?? this.expiryDate,
      cvv: cvv ?? this.cvv,
      type: type ?? this.type,
      brand: brand ?? this.brand,
      creditLimit: creditLimit ?? this.creditLimit,
      availableCredit: availableCredit ?? this.availableCredit,
      isActive: isActive ?? this.isActive,
      isBlocked: isBlocked ?? this.isBlocked,
    );
  }
}