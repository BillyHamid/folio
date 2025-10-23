import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/banking_provider.dart';
import '../models/transaction.dart';
import '../widgets/transaction_item.dart';

class TransactionsScreen extends StatefulWidget {
  const TransactionsScreen({super.key});

  @override
  State<TransactionsScreen> createState() => _TransactionsScreenState();
}

class _TransactionsScreenState extends State<TransactionsScreen> {
  TransactionCategory? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E3A8A),
        foregroundColor: Colors.white,
        elevation: 0,
        title: Text(
          'Transactions',
          style: GoogleFonts.poppins(
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: Consumer<BankingProvider>(
        builder: (context, bankingProvider, child) {
          List<Transaction> transactions = _selectedCategory != null
              ? bankingProvider.getTransactionsByCategory(_selectedCategory!)
              : bankingProvider.transactions;

          return Column(
            children: [
              // Filter chips
              if (_selectedCategory != null)
                Container(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Chip(
                        label: Text(
                          _getCategoryString(_selectedCategory!),
                          style: GoogleFonts.poppins(fontSize: 12),
                        ),
                        onDeleted: () {
                          setState(() {
                            _selectedCategory = null;
                          });
                        },
                        backgroundColor: const Color(0xFF1E3A8A).withOpacity(0.1),
                        deleteIconColor: const Color(0xFF1E3A8A),
                      ),
                    ],
                  ),
                ),
              
              // Transactions list
              Expanded(
                child: transactions.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.receipt_long_outlined,
                              size: 64,
                              color: Colors.grey[400],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Aucune transaction trouvée',
                              style: GoogleFonts.poppins(
                                fontSize: 16,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: transactions.length,
                        itemBuilder: (context, index) {
                          final transaction = transactions[index];
                          return Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(12),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(0.1),
                                  blurRadius: 4,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                            child: TransactionItem(transaction: transaction),
                          );
                        },
                      ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Filtrer par catégorie',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text('Toutes les catégories'),
              leading: Radio<TransactionCategory?>(
                value: null,
                groupValue: _selectedCategory,
                onChanged: (value) {
                  setState(() {
                    _selectedCategory = value;
                  });
                  Navigator.pop(context);
                },
              ),
            ),
            ...TransactionCategory.values.map(
              (category) => ListTile(
                title: Text(_getCategoryString(category)),
                leading: Radio<TransactionCategory?>(
                  value: category,
                  groupValue: _selectedCategory,
                  onChanged: (value) {
                    setState(() {
                      _selectedCategory = value;
                    });
                    Navigator.pop(context);
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getCategoryString(TransactionCategory category) {
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
}