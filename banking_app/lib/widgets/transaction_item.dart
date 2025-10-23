import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../models/transaction.dart';

class TransactionItem extends StatelessWidget {
  final Transaction transaction;

  const TransactionItem({
    super.key,
    required this.transaction,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      leading: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: _getColorForCategory(transaction.category).withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          _getIconForCategory(transaction.category),
          color: _getColorForCategory(transaction.category),
          size: 24,
        ),
      ),
      title: Text(
        transaction.title,
        style: GoogleFonts.poppins(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: Colors.grey[800],
        ),
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            transaction.description,
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 2),
          Text(
            DateFormat('dd MMM yyyy', 'fr_FR').format(transaction.date),
            style: GoogleFonts.poppins(
              fontSize: 12,
              color: Colors.grey[500],
            ),
          ),
        ],
      ),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(
            transaction.formattedAmount,
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: _getAmountColor(transaction.type),
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: _getColorForCategory(transaction.category).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              transaction.categoryString,
              style: GoogleFonts.poppins(
                fontSize: 10,
                color: _getColorForCategory(transaction.category),
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _getAmountColor(TransactionType type) {
    switch (type) {
      case TransactionType.income:
        return Colors.green[600]!;
      case TransactionType.expense:
        return Colors.red[600]!;
      case TransactionType.transfer:
        return Colors.blue[600]!;
    }
  }

  Color _getColorForCategory(TransactionCategory category) {
    switch (category) {
      case TransactionCategory.salary:
        return Colors.green[600]!;
      case TransactionCategory.shopping:
        return Colors.purple[600]!;
      case TransactionCategory.food:
        return Colors.orange[600]!;
      case TransactionCategory.transport:
        return Colors.blue[600]!;
      case TransactionCategory.entertainment:
        return Colors.pink[600]!;
      case TransactionCategory.bills:
        return Colors.red[600]!;
      case TransactionCategory.healthcare:
        return Colors.teal[600]!;
      case TransactionCategory.education:
        return Colors.indigo[600]!;
      case TransactionCategory.investment:
        return Colors.amber[600]!;
      case TransactionCategory.transfer:
        return Colors.cyan[600]!;
      case TransactionCategory.other:
        return Colors.grey[600]!;
    }
  }

  IconData _getIconForCategory(TransactionCategory category) {
    switch (category) {
      case TransactionCategory.salary:
        return Icons.work_outline;
      case TransactionCategory.shopping:
        return Icons.shopping_bag_outlined;
      case TransactionCategory.food:
        return Icons.restaurant_outlined;
      case TransactionCategory.transport:
        return Icons.directions_car_outlined;
      case TransactionCategory.entertainment:
        return Icons.movie_outlined;
      case TransactionCategory.bills:
        return Icons.receipt_outlined;
      case TransactionCategory.healthcare:
        return Icons.local_hospital_outlined;
      case TransactionCategory.education:
        return Icons.school_outlined;
      case TransactionCategory.investment:
        return Icons.trending_up_outlined;
      case TransactionCategory.transfer:
        return Icons.swap_horiz_outlined;
      case TransactionCategory.other:
        return Icons.more_horiz_outlined;
    }
  }
}