import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

class AuthService {
  static const String _userKey = 'current_user';
  static const String _isLoggedInKey = 'is_logged_in';

  // Simulate authentication with hardcoded credentials
  static const String _demoEmail = 'demo@bank.com';
  static const String _demoPassword = 'demo123';

  Future<bool> login(String email, String password) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    if (email == _demoEmail && password == _demoPassword) {
      final user = User(
        id: '1',
        firstName: 'Jean',
        lastName: 'Dupont',
        email: email,
        phoneNumber: '+33 6 12 34 56 78',
        dateOfBirth: DateTime(1990, 5, 15),
        profileImageUrl: '',
        createdAt: DateTime.now().subtract(const Duration(days: 365)),
      );

      await _saveUser(user);
      await _setLoggedIn(true);
      return true;
    }
    return false;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_userKey);
    await prefs.setBool(_isLoggedInKey, false);
  }

  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_isLoggedInKey) ?? false;
  }

  Future<User?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString(_userKey);
    if (userJson != null) {
      return User.fromJson(jsonDecode(userJson));
    }
    return null;
  }

  Future<void> _saveUser(User user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, jsonEncode(user.toJson()));
  }

  Future<void> _setLoggedIn(bool isLoggedIn) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_isLoggedInKey, isLoggedIn);
  }

  Future<bool> register(String firstName, String lastName, String email,
      String password, String phoneNumber, DateTime dateOfBirth) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 2));

    // In a real app, this would make an API call
    final user = User(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      profileImageUrl: '',
      createdAt: DateTime.now(),
    );

    await _saveUser(user);
    await _setLoggedIn(true);
    return true;
  }
}