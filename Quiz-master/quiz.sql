-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2019 at 09:41 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_attempt` ()  BEGIN 
 SELECT * FROM user_table;
 
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` int(11) NOT NULL,
  `log_event` varchar(100) NOT NULL,
  `event_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `log_user` varchar(255) DEFAULT NULL,
  `ip` int(4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_event`, `event_timestamp`, `log_user`, `ip`) VALUES
(1, 'Delete Product : - 12', '2019-09-19 07:56:07', 'sakshamta@test.com', 455219911),
(2, 'Delete Product Failed : - 12', '2019-09-19 07:56:08', 'sakshamta@test.com', 455219911),
(3, 'Delete Product : - 10', '2019-09-19 07:56:10', 'sakshamta@test.com', 455219911),
(4, 'Added a new sales order with id : 150 of status : draft', '2019-09-19 10:30:03', 'sakshamta@test.com', 455219911),
(5, 'Added a new sales order with id : 149 of status : draft', '2019-09-19 10:30:03', 'sakshamta@test.com', 455219911),
(6, 'Confirmed sales order no : 150', '2019-09-19 10:32:38', 'sakshamta@test.com', 455219911),
(7, 'Confirmed sales order no : 150', '2019-09-19 10:34:31', 'sakshamta@test.com', 455219911),
(8, 'Confirmed sales order no : 150', '2019-09-19 10:35:56', 'sakshamta@test.com', 455219911),
(9, 'Deleted sales draft no :  150', '2019-09-19 10:37:46', 'sakshamta@test.com', 455219911),
(10, 'Deleted sales draft no :  145', '2019-09-19 10:38:41', 'sakshamta@test.com', 455219911),
(11, 'Confirmed sales order no : 149', '2019-09-19 10:42:04', 'sakshamta@test.com', 455219911),
(12, 'Updated status to \"fulfilled\" for  sales order no : 149', '2019-09-19 10:44:56', 'sakshamta@test.com', 455219911),
(13, 'Cancelled sales order no : 149', '2019-09-19 10:45:02', 'sakshamta@test.com', 455219911),
(14, 'Cancelled sales order no : 149', '2019-09-19 10:45:46', 'sakshamta@test.com', 455219911),
(15, 'Updated status to \"fulfilled\" for  sales order no : 149', '2019-09-19 10:46:06', 'sakshamta@test.com', 455219911),
(16, 'Updated status to \"fulfilled\" for  sales order no : 149', '2019-09-19 10:47:03', 'sakshamta@test.com', 455219911),
(17, 'Updated status to \"fulfilled\" for  sales order no : 149', '2019-09-19 10:53:38', 'sakshamta@test.com', 455219911),
(18, 'Cancelled sales order no : 149', '2019-09-19 10:56:43', 'sakshamta@test.com', 455219911),
(19, 'Updated sales draft no : 149', '2019-09-19 11:29:30', 'sakshamta@test.com', 455219911),
(20, 'Updated sales draft no : 149', '2019-09-19 11:30:05', 'sakshamta@test.com', 455219911),
(21, 'Deleted sales draft no :  149', '2019-09-19 11:30:09', 'sakshamta@test.com', 455219911),
(22, 'Updated delivered quantity for sales order no : 125', '2019-09-19 11:36:27', 'sakshamta@test.com', 455219911),
(23, 'Updated delivered quantity for sales order no : 125', '2019-09-19 11:36:59', 'sakshamta@test.com', 455219911),
(24, 'Updated delivered quantity for sales order no : 136', '2019-09-19 11:38:09', 'sakshamta@test.com', 455219911),
(25, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:38:55', 'sakshamta@test.com', 455219911),
(26, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:40:21', 'sakshamta@test.com', 455219911),
(27, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:41:22', 'sakshamta@test.com', 455219911),
(28, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:41:22', 'sakshamta@test.com', 455219911),
(29, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:42:06', 'sakshamta@test.com', 455219911),
(30, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:44:07', 'sakshamta@test.com', 455219911),
(31, 'Updated delivered quantity for sales order no : 148', '2019-09-19 11:46:07', 'sakshamta@test.com', 455219911),
(32, 'Added a new sales order with id : 151 of status : confirmed', '2019-09-19 11:52:06', 'sakshamta@test.com', 455219911),
(33, 'Updated delivered quantity for sales order no : 151', '2019-09-19 11:56:05', 'sakshamta@test.com', 455219911),
(34, 'Updated delivered quantity for sales order no : 151', '2019-09-19 11:56:12', 'sakshamta@test.com', 455219911),
(35, 'Updated delivered quantity for sales order no : 151', '2019-09-19 11:56:26', 'sakshamta@test.com', 455219911),
(36, 'Logged In', '2019-09-20 06:01:12', 'sakshamta@test.com', 455219911),
(37, 'Logged In', '2019-09-20 06:08:42', 'sakshamta@test.com', 3232235521),
(38, 'Logged In', '2019-09-20 06:09:02', 'user@test.com', 3843621633),
(39, 'Logged In', '2019-09-20 06:09:06', 'sakshamta@test.com', 3843621633),
(40, 'Confirmed sales order no : 121', '2019-09-20 06:09:20', 'sakshamta@test.com', 3843621633),
(41, 'Confirmed sales order no : 121', '2019-09-20 06:09:22', 'sakshamta@test.com', 3843621633),
(42, 'Confirmed sales order no : 121', '2019-09-20 06:09:24', 'sakshamta@test.com', 3843621633),
(43, 'Confirmed sales order no : 121', '2019-09-20 06:10:55', 'sakshamta@test.com', 3843621633),
(44, 'Confirmed sales order no : 122', '2019-09-20 06:11:48', 'sakshamta@test.com', 3843621633),
(45, 'Cancelled sales order no : 121', '2019-09-20 06:24:18', 'sakshamta@test.com', 3843621633),
(46, 'Updated status to \"fulfilled\" for  sales order no : 121', '2019-09-20 06:29:30', 'sakshamta@test.com', 3843621633),
(47, 'Updated sales draft no : 125', '2019-09-20 07:14:46', 'sakshamta@test.com', 455219911),
(48, 'Confirmed sales order no : 125', '2019-09-20 07:28:24', 'sakshamta@test.com', 455219911),
(49, 'Added a new sales order with id : 152 of status : draft', '2019-09-20 07:31:27', 'sakshamta@test.com', 455219911),
(50, 'Updated sales draft no : 152', '2019-09-20 07:32:39', 'sakshamta@test.com', 455219911),
(51, 'Confirmed sales order no : 152', '2019-09-20 07:32:48', 'sakshamta@test.com', 455219911),
(52, 'Updated delivered quantity for sales order no : 152', '2019-09-20 07:33:42', 'sakshamta@test.com', 455219911),
(53, 'Updated delivered quantity for sales order no : 152', '2019-09-20 07:40:22', 'sakshamta@test.com', 455219911),
(54, 'Updated delivered quantity for sales order no : 152', '2019-09-20 07:41:29', 'sakshamta@test.com', 455219911),
(55, 'Updated delivered quantity for sales order no : 152', '2019-09-20 07:47:29', 'sakshamta@test.com', 455219911),
(56, 'Added a new sales order with id : 153 of status : draft', '2019-09-20 08:00:17', 'sakshamta@test.com', 455219911),
(57, 'Confirmed sales order no : 153', '2019-09-20 08:04:37', 'sakshamta@test.com', 455219911),
(58, 'Logged Out', '2019-09-20 08:20:07', 'sakshamta@test.com', 455219911),
(59, 'Logged In', '2019-09-20 08:20:16', 'sakshamta@test.com', 3392359468),
(60, 'Updated status to \"fulfilled\" for  sales order no : 130', '2019-09-20 10:10:14', 'sakshamta@test.com', 3392359468),
(61, 'Logged In', '2019-09-23 06:28:07', 'sakshamta@test.com', 3392359468),
(62, 'Succesfully updated permissions for user : super@test.com', '2019-09-23 06:37:46', 'sakshamta@test.com', 3392359468),
(63, 'Logged In', '2019-09-23 06:48:21', 'sakshamta@test.com', 3843621633),
(64, 'Succesfully updated permissions for user : admin@test.com', '2019-09-23 06:50:30', 'sakshamta@test.com', 3843621633),
(65, 'Succesfully updated permissions for user : admin@test.com', '2019-09-23 06:52:01', 'sakshamta@test.com', 3392359468),
(66, 'Viewed email templates', '2019-09-23 07:16:48', 'sakshamta@test.com', 3392359468),
(67, 'Added a new sales order with id : 155 of status : draft', '2019-09-23 10:24:08', 'sakshamta@test.com', 3392359468),
(68, 'Added a new sales order with id : 154 of status : draft', '2019-09-23 10:24:08', 'sakshamta@test.com', 3392359468),
(69, 'Confirmed sales order no : 155', '2019-09-23 10:33:16', 'sakshamta@test.com', 3392359468),
(70, 'Logged In', '2019-09-24 08:24:32', 'sakshamta@test.com', 3392359468),
(71, 'undefinedsauravads1232131@gmail.com', '2019-09-24 08:55:57', 'sakshamta@test.com', 3392359468),
(72, 'undefinedhakinaweje@mailinator.net', '2019-09-24 09:03:20', 'sakshamta@test.com', 3392359468),
(73, 'undefinedhakinaweje@mailinator.net', '2019-09-24 09:03:25', 'sakshamta@test.com', 3392359468),
(74, 'undefinedhakinaweje@mailinator.net', '2019-09-24 09:03:25', 'sakshamta@test.com', 3392359468),
(75, 'undefinedhakinaweje@mailinator.net', '2019-09-24 09:03:25', 'sakshamta@test.com', 3392359468),
(76, 'Added a new sales order with id : 156 of status : draft', '2019-09-24 09:04:20', 'sakshamta@test.com', 3392359468),
(77, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:10', 'sakshamta@test.com', 3392359468),
(78, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:12', 'sakshamta@test.com', 3392359468),
(79, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:14', 'sakshamta@test.com', 3392359468),
(80, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:15', 'sakshamta@test.com', 3392359468),
(81, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:16', 'sakshamta@test.com', 3392359468),
(82, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:05:35', 'sakshamta@test.com', 3392359468),
(83, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:06:19', 'sakshamta@test.com', 3392359468),
(84, 'undefinedpezorabe@mailinator.com', '2019-09-24 09:06:49', 'sakshamta@test.com', 3392359468),
(85, 'undefinedkenuloz@mailinator.com', '2019-09-24 09:06:58', 'sakshamta@test.com', 3392359468),
(86, 'undefinedtahivyfu@mailinator.com', '2019-09-24 09:07:51', 'sakshamta@test.com', 3392359468),
(87, 'undefinedcysyfes@mailinator.net', '2019-09-24 09:08:22', 'sakshamta@test.com', 3392359468),
(88, 'undefinedcysyfes@mailinator.net', '2019-09-24 09:08:28', 'sakshamta@test.com', 3392359468),
(89, 'undefinedcysyfes@mailinator.net', '2019-09-24 09:08:28', 'sakshamta@test.com', 3392359468),
(90, 'undefinedcysyfes@mailinator.net', '2019-09-24 09:14:07', 'sakshamta@test.com', 3392359468),
(91, 'undefinedcsysyfes@mailinator.net', '2019-09-24 09:14:11', 'sakshamta@test.com', 3392359468),
(92, 'undefinedcsysyfes@mailinator.net', '2019-09-24 09:14:11', 'sakshamta@test.com', 3392359468),
(93, 'undefinedcsysyfes@mailinator.net', '2019-09-24 09:14:14', 'sakshamta@test.com', 3392359468),
(94, 'undefinedcsysyfes@mailinator.net', '2019-09-24 09:14:14', 'sakshamta@test.com', 3392359468),
(95, 'undefinedcsys33333yfes@mailinator.net', '2019-09-24 09:14:21', 'sakshamta@test.com', 3392359468),
(96, 'undefinedcsys33333yfes@mailinator.net', '2019-09-24 09:14:21', 'sakshamta@test.com', 3392359468),
(97, 'undefinedcsys33333yfes@mailinator.net', '2019-09-24 09:14:27', 'sakshamta@test.com', 3392359468),
(98, 'undefinedcccc@mailinator.net', '2019-09-24 09:14:34', 'sakshamta@test.com', 3392359468),
(99, 'Failed to Log In', '2019-09-25 08:19:42', 'sakshamta@test.com', 3392359468),
(100, 'Logged In', '2019-09-25 08:19:45', 'sakshamta@test.com', 3392359468),
(101, 'Logged In', '2019-09-25 08:43:02', 'sakshamta@test.com', 3392359463),
(102, 'undefinedjeqy@mailinator.net', '2019-09-25 08:58:08', 'sakshamta@test.com', 3392359463),
(103, 'undefinedjeqy@mailinator.net', '2019-09-25 08:58:11', 'sakshamta@test.com', 3392359463),
(104, 'undefinedlixuru@mailinator.com', '2019-09-25 09:09:25', 'sakshamta@test.com', 3392359463),
(105, 'undefineddehaqo@mailinator.net', '2019-09-25 09:16:37', 'sakshamta@test.com', 3392359463),
(106, 'undefineddehaqo@mailinator.net', '2019-09-25 09:16:39', 'sakshamta@test.com', 3392359463),
(107, 'undefinedgyjeby@mailinator.net', '2019-09-25 09:16:50', 'sakshamta@test.com', 3392359463),
(108, 'undefinedhusy@mailinator.net', '2019-09-25 09:18:51', 'sakshamta@test.com', 3392359463),
(109, 'undefinedhusy@mailinator.net', '2019-09-25 09:18:51', 'sakshamta@test.com', 3392359463),
(110, 'undefinedhusy@mailinator.net', '2019-09-25 09:18:56', 'sakshamta@test.com', 3392359463),
(111, 'undefinedhusy@mailinator.net', '2019-09-25 09:18:56', 'sakshamta@test.com', 3392359463),
(112, 'undefinedhifupir@mailinator.net', '2019-09-25 09:19:33', 'sakshamta@test.com', 3392359463),
(113, 'undefinedhifupir@mailinator.net', '2019-09-25 09:19:33', 'sakshamta@test.com', 3392359463),
(114, 'undefinedhifupir@mailinator.net', '2019-09-25 09:19:37', 'sakshamta@test.com', 3392359463),
(115, 'undefinedcekapepuwu@mailinator.com', '2019-09-25 09:20:49', 'sakshamta@test.com', 3392359463),
(116, 'undefinedcekapepuwu@mailinator.com', '2019-09-25 09:20:49', 'sakshamta@test.com', 3392359463),
(117, 'undefinedcekapepuwu@mailinator.com', '2019-09-25 09:20:53', 'sakshamta@test.com', 3392359463),
(118, 'undefinedcekapepuwu@mailinator.com', '2019-09-25 09:20:53', 'sakshamta@test.com', 3392359463),
(119, 'Added a new sales order with id : 157 of status : draft', '2019-09-25 10:05:27', 'sakshamta@test.com', 3392359463),
(120, 'Added a new sales order with id : 158 of status : draft', '2019-09-25 10:07:41', 'sakshamta@test.com', 3392359463),
(121, 'Logged In', '2019-09-26 08:21:59', 'sakshamta@test.com', 3392359463),
(122, 'Logged In', '2019-09-26 08:35:14', 'sakshamta@test.com', 3392359475),
(123, 'Added a new sales order with id : 1 of status : draft', '2019-09-26 10:05:48', 'sakshamta@test.com', 3392359463),
(124, 'Updated sales draft no : 1', '2019-09-26 10:06:01', 'sakshamta@test.com', 3392359463),
(125, 'Confirmed sales order no : 1', '2019-09-26 10:06:03', 'sakshamta@test.com', 3392359463),
(126, 'Updated delivered quantity for sales order no : 1', '2019-09-26 10:06:18', 'sakshamta@test.com', 3392359463),
(127, 'Updated delivered quantity for sales order no : 1', '2019-09-26 10:06:25', 'sakshamta@test.com', 3392359463),
(128, 'Updated delivered quantity for sales order no : 1', '2019-09-26 10:06:28', 'sakshamta@test.com', 3392359463),
(129, 'Updated status to \"fulfilled\" for  sales order no : 1', '2019-09-26 10:06:55', 'sakshamta@test.com', 3392359463),
(130, 'undefinedfadekak@mailinator.net', '2019-09-26 10:27:49', 'sakshamta@test.com', 3392359463),
(131, 'undefinedfadekak@mailinator.net', '2019-09-26 10:27:49', 'sakshamta@test.com', 3392359463),
(132, 'undefinedfadekak@mailinator.net', '2019-09-26 10:27:50', 'sakshamta@test.com', 3392359463),
(133, 'undefinedfadekak@mailinator.net', '2019-09-26 10:27:50', 'sakshamta@test.com', 3392359463),
(134, 'undefinedfadefdfddfddfddddddddddddddddkak@mailinator.net', '2019-09-26 10:27:54', 'sakshamta@test.com', 3392359463),
(135, 'Failed to add a new sales order with status  draft', '2019-09-26 10:29:37', 'sakshamta@test.com', 3392359463),
(136, 'Failed to add a new sales order with status  draft', '2019-09-26 10:29:42', 'sakshamta@test.com', 3392359463),
(137, 'Failed to add a new sales order with status  draft', '2019-09-26 10:31:12', 'sakshamta@test.com', 3392359463),
(138, 'Failed to add a new sales order with status  draft', '2019-09-26 10:32:03', 'sakshamta@test.com', 3392359463),
(139, 'Failed to add a new sales order with status  draft', '2019-09-26 10:32:04', 'sakshamta@test.com', 3392359463),
(140, 'Failed to add a new sales order with status  draft', '2019-09-26 10:37:19', 'sakshamta@test.com', 3392359463),
(141, 'Failed to add a new sales order with status  draft', '2019-09-26 10:38:04', 'sakshamta@test.com', 3392359463),
(142, 'Failed to add a new sales order with status  draft', '2019-09-26 10:38:45', 'sakshamta@test.com', 3392359463),
(143, 'Failed to add a new sales order with status  draft', '2019-09-26 10:40:58', 'sakshamta@test.com', 3392359463),
(144, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:22', 'sakshamta@test.com', 3392359463),
(145, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:22', 'sakshamta@test.com', 3392359463),
(146, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:45', 'sakshamta@test.com', 3392359463),
(147, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:46', 'sakshamta@test.com', 3392359463),
(148, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:50', 'sakshamta@test.com', 3392359463),
(149, 'Failed to add a new sales order with status  draft', '2019-09-26 10:48:50', 'sakshamta@test.com', 3392359463),
(150, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:19', 'sakshamta@test.com', 3392359463),
(151, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:22', 'sakshamta@test.com', 3392359463),
(152, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:23', 'sakshamta@test.com', 3392359463),
(153, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:24', 'sakshamta@test.com', 3392359463),
(154, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:59', 'sakshamta@test.com', 3392359463),
(155, 'Failed to add a new sales order with status  draft', '2019-09-26 10:49:59', 'sakshamta@test.com', 3392359463),
(156, 'Failed to add a new sales order with status  draft', '2019-09-26 10:50:03', 'sakshamta@test.com', 3392359463),
(157, 'Failed to add a new sales order with status  draft', '2019-09-26 10:50:03', 'sakshamta@test.com', 3392359463),
(158, 'Failed to add a new sales order with status  draft', '2019-09-26 10:57:13', 'sakshamta@test.com', 3392359463),
(159, 'Failed to add a new sales order with status  draft', '2019-09-26 10:57:13', 'sakshamta@test.com', 3392359463),
(160, 'Failed to add a new sales order with status  draft', '2019-09-26 10:57:51', 'sakshamta@test.com', 3392359463),
(161, 'Failed to add a new sales order with status  draft', '2019-09-26 10:58:57', 'sakshamta@test.com', 3392359463),
(162, 'Logged In', '2019-09-27 06:30:45', 'sakshamta@test.com', 3392359463),
(163, 'Failed to add a new sales order with status  draft', '2019-09-27 06:30:58', 'sakshamta@test.com', 3392359463),
(164, 'Failed to add a new sales order with status  draft', '2019-09-27 06:31:11', 'sakshamta@test.com', 3392359463),
(165, 'Failed to add a new sales order with status  draft', '2019-09-27 06:31:14', 'sakshamta@test.com', 3392359463),
(166, 'Failed to add a new sales order with status  draft', '2019-09-27 06:31:20', 'sakshamta@test.com', 3392359463),
(167, 'Failed to add a new sales order with status  draft', '2019-09-27 06:33:04', 'sakshamta@test.com', 3392359463),
(168, 'Failed to add a new sales order with status  draft', '2019-09-27 06:33:46', 'sakshamta@test.com', 3392359463),
(169, 'Failed to add a new sales order with status  draft', '2019-09-27 06:33:46', 'sakshamta@test.com', 3392359463),
(170, 'Added a new sales order with id : 9 of status : draft', '2019-09-27 06:38:38', 'sakshamta@test.com', 3392359463),
(171, 'Added a new sales order with id : 10 of status : draft', '2019-09-27 06:41:55', 'sakshamta@test.com', 3392359463),
(172, 'Added a new sales order with id : 11 of status : draft', '2019-09-27 06:43:02', 'sakshamta@test.com', 3392359463),
(173, 'Added a new sales order with id : 12 of status : draft', '2019-09-27 06:43:02', 'sakshamta@test.com', 3392359463),
(174, 'Added a new sales order with id : 13 of status : draft', '2019-09-27 06:44:31', 'sakshamta@test.com', 3392359463),
(175, 'Added a new sales order with id : 14 of status : draft', '2019-09-27 06:45:25', 'sakshamta@test.com', 3392359463),
(176, 'Added a new sales order with id : 15 of status : draft', '2019-09-27 06:51:55', 'sakshamta@test.com', 3392359463),
(177, 'Added a new sales order with id : 16 of status : draft', '2019-09-27 06:52:56', 'sakshamta@test.com', 3392359463),
(178, 'Added a new sales order with id : 17 of status : draft', '2019-09-27 06:54:34', 'sakshamta@test.com', 3392359463),
(179, 'Added a new sales order with id : 18 of status : confirmed', '2019-09-27 06:55:48', 'sakshamta@test.com', 3392359463),
(180, 'Added a new sales order with id : 19 of status : draft', '2019-09-27 06:57:07', 'sakshamta@test.com', 3392359463),
(181, 'Added a new sales order with id : 20 of status : draft', '2019-09-27 06:57:07', 'sakshamta@test.com', 3392359463),
(182, 'Added a new sales order with id : 21 of status : confirmed', '2019-09-27 06:58:09', 'sakshamta@test.com', 3392359463),
(183, 'Added a new sales order with id : 22 of status : confirmed', '2019-09-27 06:59:01', 'sakshamta@test.com', 3392359463),
(184, 'Added a new sales order with id : 23 of status : confirmed', '2019-09-27 06:59:47', 'sakshamta@test.com', 3392359463),
(185, 'Added a new sales order with id : 24 of status : confirmed', '2019-09-27 07:00:43', 'sakshamta@test.com', 3392359463),
(186, 'Added a new sales order with id : 25 of status : confirmed', '2019-09-27 07:01:22', 'sakshamta@test.com', 3392359463),
(187, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:01:45', 'sakshamta@test.com', 3392359463),
(188, 'Added a new sales order with id : 27 of status : confirmed', '2019-09-27 07:02:05', 'sakshamta@test.com', 3392359463),
(189, 'Added a new sales order with id : 28 of status : confirmed', '2019-09-27 07:05:15', 'sakshamta@test.com', 3392359463),
(190, 'New Product added successfully', '2019-09-27 07:10:45', 'sakshamta@test.com', 3392359463),
(191, 'New Product added successfully', '2019-09-27 07:10:50', 'sakshamta@test.com', 3392359463),
(192, 'New Product added successfully', '2019-09-27 07:10:53', 'sakshamta@test.com', 3392359463),
(193, 'New Product added successfully', '2019-09-27 07:10:56', 'sakshamta@test.com', 3392359463),
(194, 'New Product added successfully', '2019-09-27 07:10:58', 'sakshamta@test.com', 3392359463),
(195, 'New Product added successfully', '2019-09-27 07:11:07', 'sakshamta@test.com', 3392359463),
(196, 'New Product added successfully', '2019-09-27 07:11:09', 'sakshamta@test.com', 3392359463),
(197, 'New Product added successfully', '2019-09-27 07:11:13', 'sakshamta@test.com', 3392359463),
(198, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:17:50', 'sakshamta@test.com', 3392359463),
(199, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:18:23', 'sakshamta@test.com', 3392359463),
(200, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:18:45', 'sakshamta@test.com', 3392359463),
(201, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:19:15', 'sakshamta@test.com', 3392359463),
(202, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:19:23', 'sakshamta@test.com', 3392359463),
(203, 'Added a new sales order with id : 34 of status : confirmed', '2019-09-27 07:20:00', 'sakshamta@test.com', 3392359463),
(204, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:21:44', 'sakshamta@test.com', 3392359463),
(205, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:22:46', 'sakshamta@test.com', 3392359463),
(206, 'Failed to add a new sales order with status  confirmed', '2019-09-27 07:22:46', 'sakshamta@test.com', 3392359463),
(207, 'Added a new sales order with id : 38 of status : confirmed', '2019-09-27 07:24:41', 'sakshamta@test.com', 3392359463),
(208, 'Failed to add a new sales order with status  draft', '2019-09-27 08:50:41', 'sakshamta@test.com', 3392359463),
(209, 'Failed to add a new sales order with status  draft', '2019-09-27 08:50:41', 'sakshamta@test.com', 3392359463),
(210, 'Added a new sales order with id : 41 of status : confirmed', '2019-09-27 08:50:57', 'sakshamta@test.com', 3392359463),
(211, 'Added a new sales order with id : 42 of status : confirmed', '2019-09-27 08:50:57', 'sakshamta@test.com', 3392359463),
(212, 'Failed to add a new sales order with status  draft', '2019-09-27 08:51:53', 'sakshamta@test.com', 3392359463),
(213, 'Failed to add a new sales order with status  draft', '2019-09-27 08:52:42', 'sakshamta@test.com', 3392359463),
(214, 'Failed to add a new sales order with status  draft', '2019-09-27 08:52:42', 'sakshamta@test.com', 3392359463),
(215, 'Failed to add a new sales order with status  draft', '2019-09-27 08:53:25', 'sakshamta@test.com', 3392359463),
(216, 'Failed to add a new sales order with status  draft', '2019-09-27 08:54:04', 'sakshamta@test.com', 3392359463),
(217, 'Failed to add a new sales order with status  draft', '2019-09-27 08:54:46', 'sakshamta@test.com', 3392359463),
(218, 'Failed to add a new sales order with status  draft', '2019-09-27 08:54:46', 'sakshamta@test.com', 3392359463),
(219, 'Failed to add a new sales order with status  draft', '2019-09-27 08:56:15', 'sakshamta@test.com', 3392359463),
(220, 'Failed to add a new sales order with status  draft', '2019-09-27 08:56:15', 'sakshamta@test.com', 3392359463),
(221, 'Failed to add a new sales order with status  draft', '2019-09-27 08:57:46', 'sakshamta@test.com', 3392359463),
(222, 'Failed to add a new sales order with status  draft', '2019-09-27 08:58:34', 'sakshamta@test.com', 3392359463),
(223, 'Failed to add a new sales order with status  draft', '2019-09-27 08:59:55', 'sakshamta@test.com', 3392359463),
(224, 'Failed to add a new sales order with status  draft', '2019-09-27 09:00:54', 'sakshamta@test.com', 3392359463),
(225, 'Failed to add a new sales order with status  draft', '2019-09-27 09:03:12', 'sakshamta@test.com', 3392359463),
(226, 'Failed to add a new sales order with status  draft', '2019-09-27 09:03:40', 'sakshamta@test.com', 3392359463),
(227, 'Added a new sales order with id : 58 of status : draft', '2019-09-27 09:03:50', 'sakshamta@test.com', 3392359463),
(228, 'Failed to update sales draft no : 58', '2019-09-27 09:04:48', 'sakshamta@test.com', 3392359463),
(229, 'Failed to update sales draft no : 58', '2019-09-27 09:06:58', 'sakshamta@test.com', 3392359463),
(230, 'Failed to update sales draft no : 58', '2019-09-27 09:07:12', 'sakshamta@test.com', 3392359463),
(231, 'Failed to update sales draft no : 58', '2019-09-27 09:07:12', 'sakshamta@test.com', 3392359463),
(232, 'Failed to update sales draft no : 58', '2019-09-27 09:07:18', 'sakshamta@test.com', 3392359463),
(233, 'Failed to update sales draft no : 58', '2019-09-27 09:07:18', 'sakshamta@test.com', 3392359463),
(234, 'Added a new sales order with id : 59 of status : draft', '2019-09-27 09:10:18', 'sakshamta@test.com', 3392359463),
(235, 'Failed to confirm sales order no : 59', '2019-09-27 09:10:21', 'sakshamta@test.com', 3392359463),
(236, 'Added a new sales order with id : 60 of status : draft', '2019-09-27 09:11:52', 'sakshamta@test.com', 3392359463),
(237, 'Failed to confirm sales order no : 60', '2019-09-27 09:11:57', 'sakshamta@test.com', 3392359463),
(238, 'Added a new sales order with id : 61 of status : draft', '2019-09-27 09:12:54', 'sakshamta@test.com', 3392359463),
(239, 'Failed to confirm sales order no : 61', '2019-09-27 09:12:56', 'sakshamta@test.com', 3392359463),
(240, 'Added a new sales order with id : 62 of status : draft', '2019-09-27 09:13:49', 'sakshamta@test.com', 3392359463),
(241, 'Failed to confirm sales order no : 62', '2019-09-27 09:13:51', 'sakshamta@test.com', 3392359463),
(242, 'Added a new sales order with id : 63 of status : draft', '2019-09-27 09:14:31', 'sakshamta@test.com', 3392359463),
(243, 'Failed to confirm sales order no : 63', '2019-09-27 09:14:35', 'sakshamta@test.com', 3392359463),
(244, 'Added a new sales order with id : 64 of status : draft', '2019-09-27 09:17:28', 'sakshamta@test.com', 3392359463),
(245, 'Failed to confirm sales order no : 64', '2019-09-27 09:18:42', 'sakshamta@test.com', 3392359463),
(246, 'Added a new sales order with id : 65 of status : draft', '2019-09-27 09:19:11', 'sakshamta@test.com', 3392359463),
(247, 'Confirmed sales order no : 65', '2019-09-27 09:19:14', 'sakshamta@test.com', 3392359463),
(248, 'Added a new sales order with id : 66 of status : draft', '2019-09-27 09:21:36', 'sakshamta@test.com', 3392359463),
(249, 'Confirmed sales order no : 66', '2019-09-27 09:21:42', 'sakshamta@test.com', 3392359463),
(250, 'Failed to confirm sales order no : 66', '2019-09-27 09:23:03', 'sakshamta@test.com', 3392359463),
(251, 'Confirmed sales order no : 66', '2019-09-27 09:25:57', 'sakshamta@test.com', 3392359463),
(252, 'Failed to confirm sales order no : 66', '2019-09-27 09:26:19', 'sakshamta@test.com', 3392359463),
(253, 'Added a new sales order with id : 67 of status : draft', '2019-09-27 10:18:40', 'sakshamta@test.com', 3392359463),
(254, 'Confirmed sales order no : 67', '2019-09-27 10:18:42', 'sakshamta@test.com', 3392359463),
(255, 'Confirmed sales order no : 67', '2019-09-27 10:19:25', 'sakshamta@test.com', 3392359463),
(256, 'Failed to confirm sales order no : 67', '2019-09-27 10:23:39', 'sakshamta@test.com', 3392359463),
(257, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:08', 'sakshamta@test.com', 3392359463),
(258, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:11', 'sakshamta@test.com', 3392359463),
(259, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:13', 'sakshamta@test.com', 3392359463),
(260, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:28', 'sakshamta@test.com', 3392359463),
(261, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:34', 'sakshamta@test.com', 3392359463),
(262, 'Failed to confirm sales order no : 67', '2019-09-27 10:24:34', 'sakshamta@test.com', 3392359463),
(263, 'Confirmed sales order no : 67', '2019-09-27 10:25:20', 'sakshamta@test.com', 3392359463),
(264, 'Failed to confirm sales order no : 67', '2019-09-27 10:27:17', 'sakshamta@test.com', 3392359463),
(265, 'Confirmed sales order no : 67', '2019-09-27 10:27:39', 'sakshamta@test.com', 3392359463),
(266, 'Added a new sales order with id : 68 of status : confirmed', '2019-09-27 10:49:57', 'sakshamta@test.com', 3392359463),
(267, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:50:27', 'sakshamta@test.com', 3392359463),
(268, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:51:15', 'sakshamta@test.com', 3392359463),
(269, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:51:32', 'sakshamta@test.com', 3392359463),
(270, 'Failed to update delivered quantity for sales order no : 68', '2019-09-27 10:52:03', 'sakshamta@test.com', 3392359463),
(271, 'Failed to update delivered quantity for sales order no : 68', '2019-09-27 10:52:03', 'sakshamta@test.com', 3392359463),
(272, 'Failed to update delivered quantity for sales order no : 68', '2019-09-27 10:52:08', 'sakshamta@test.com', 3392359463),
(273, 'Failed to update delivered quantity for sales order no : 68', '2019-09-27 10:52:14', 'sakshamta@test.com', 3392359463),
(274, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:52:25', 'sakshamta@test.com', 3392359463),
(275, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:52:29', 'sakshamta@test.com', 3392359463),
(276, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:52:29', 'sakshamta@test.com', 3392359463),
(277, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:52:32', 'sakshamta@test.com', 3392359463),
(278, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:54:26', 'sakshamta@test.com', 3392359463),
(279, 'Updated delivered quantity for sales order no : 68', '2019-09-27 10:54:53', 'sakshamta@test.com', 3392359463),
(280, 'Added a new sales order with id : 69 of status : draft', '2019-09-27 10:59:15', 'sakshamta@test.com', 3392359463),
(281, 'Failed to update sales draft no : 69', '2019-09-27 10:59:34', 'sakshamta@test.com', 3392359463),
(282, 'Failed to update sales draft no : 69', '2019-09-27 10:59:34', 'sakshamta@test.com', 3392359463),
(283, 'Failed to update sales draft no : 69', '2019-09-27 10:59:37', 'sakshamta@test.com', 3392359463),
(284, 'Failed to update sales draft no : 69', '2019-09-27 11:05:13', 'sakshamta@test.com', 3392359463),
(285, 'Failed to update sales draft no : 69', '2019-09-27 11:27:16', 'sakshamta@test.com', 3392359463),
(286, 'Failed to update sales draft no : 69', '2019-09-27 11:27:22', 'sakshamta@test.com', 3392359463),
(287, 'Failed to update sales draft no : 69', '2019-09-27 11:27:57', 'sakshamta@test.com', 3392359463),
(288, 'Failed to update sales draft no : 69', '2019-09-27 11:27:57', 'sakshamta@test.com', 3392359463),
(289, 'Failed to update sales draft no : 69', '2019-09-27 11:30:16', 'sakshamta@test.com', 3392359463),
(290, 'Failed to update sales draft no : 69', '2019-09-27 11:30:33', 'sakshamta@test.com', 3392359463),
(291, 'Failed to update sales draft no : 69', '2019-09-27 11:30:37', 'sakshamta@test.com', 3392359463),
(292, 'Failed to update sales draft no : 69', '2019-09-27 11:31:08', 'sakshamta@test.com', 3392359463),
(293, 'Failed to update sales draft no : 69', '2019-09-27 11:31:44', 'sakshamta@test.com', 3392359463),
(294, 'Failed to update sales draft no : 69', '2019-09-27 11:31:45', 'sakshamta@test.com', 3392359463),
(295, 'Failed to update sales draft no : 69', '2019-09-27 11:32:04', 'sakshamta@test.com', 3392359463),
(296, 'Failed to update sales draft no : 69', '2019-09-27 11:32:04', 'sakshamta@test.com', 3392359463),
(297, 'Failed to update sales draft no : 69', '2019-09-27 11:32:31', 'sakshamta@test.com', 3392359463),
(298, 'Failed to update sales draft no : 69', '2019-09-27 11:32:33', 'sakshamta@test.com', 3392359463),
(299, 'Failed to update sales draft no : 69', '2019-09-27 11:32:42', 'sakshamta@test.com', 3392359463),
(300, 'Failed to update sales draft no : 69', '2019-09-27 11:33:36', 'sakshamta@test.com', 3392359463),
(301, 'Failed to update sales draft no : 69', '2019-09-27 11:34:09', 'sakshamta@test.com', 3392359463),
(302, 'Failed to update sales draft no : 69', '2019-09-27 11:36:23', 'sakshamta@test.com', 3392359463),
(303, 'Added a new sales order with id : 70 of status : draft', '2019-09-27 11:37:09', 'sakshamta@test.com', 3392359463),
(304, 'Failed to update sales draft no : 70', '2019-09-27 11:37:38', 'sakshamta@test.com', 3392359463),
(305, 'Failed to update sales draft no : 70', '2019-09-27 11:38:05', 'sakshamta@test.com', 3392359463),
(306, 'Added a new sales order with id : 71 of status : draft', '2019-09-27 11:41:14', 'sakshamta@test.com', 3392359463),
(307, 'Failed to update sales draft no : 71', '2019-09-27 11:41:23', 'sakshamta@test.com', 3392359463),
(308, 'Failed to update sales draft no : 71', '2019-09-27 11:42:11', 'sakshamta@test.com', 3392359463),
(309, 'Failed to update sales draft no : 71', '2019-09-27 11:43:46', 'sakshamta@test.com', 3392359463),
(310, 'Failed to update sales draft no : 71', '2019-09-27 11:44:24', 'sakshamta@test.com', 3392359463),
(311, 'Failed to update sales draft no : 71', '2019-09-27 11:46:05', 'sakshamta@test.com', 3392359463),
(312, 'Failed to update sales draft no : 71', '2019-09-27 11:46:25', 'sakshamta@test.com', 3392359463),
(313, 'Failed to update sales draft no : 71', '2019-09-27 11:47:20', 'sakshamta@test.com', 3392359463),
(314, 'Updated sales draft no : 71', '2019-09-27 11:47:41', 'sakshamta@test.com', 3392359463),
(315, 'Updated sales draft no : 71', '2019-09-27 11:47:47', 'sakshamta@test.com', 3392359463),
(316, 'Failed to update sales draft no : 71', '2019-09-27 11:49:39', 'sakshamta@test.com', 3392359463),
(317, 'Failed to update sales draft no : 71', '2019-09-27 11:50:07', 'sakshamta@test.com', 3392359463),
(318, 'Failed to update sales draft no : 71', '2019-09-27 11:51:40', 'sakshamta@test.com', 3392359463),
(319, 'Failed to update sales draft no : 71', '2019-09-27 11:52:07', 'sakshamta@test.com', 3392359463),
(320, 'Failed to update sales draft no : 71', '2019-09-27 11:52:07', 'sakshamta@test.com', 3392359463),
(321, 'Added a new sales order with id : 72 of status : draft', '2019-09-27 11:52:35', 'sakshamta@test.com', 3392359463),
(322, 'Failed to update sales draft no : 72', '2019-09-27 11:52:54', 'sakshamta@test.com', 3392359463),
(323, 'Added a new sales order with id : 73 of status : draft', '2019-09-27 11:54:18', 'sakshamta@test.com', 3392359463),
(324, 'Failed to update sales draft no : 73', '2019-09-27 11:54:31', 'sakshamta@test.com', 3392359463),
(325, 'Failed to update sales draft no : 73', '2019-09-27 11:54:43', 'sakshamta@test.com', 3392359463),
(326, 'Added a new sales order with id : 74 of status : draft', '2019-09-27 11:55:49', 'sakshamta@test.com', 3392359463),
(327, 'Failed to update sales draft no : 74', '2019-09-27 11:55:57', 'sakshamta@test.com', 3392359463),
(328, 'Added a new sales order with id : 75 of status : draft', '2019-09-27 11:56:47', 'sakshamta@test.com', 3392359463),
(329, 'Updated sales draft no : 75', '2019-09-27 11:56:59', 'sakshamta@test.com', 3392359463),
(330, 'Failed to update sales draft no : 75', '2019-09-27 11:57:16', 'sakshamta@test.com', 3392359463),
(331, 'Logged In', '2019-09-29 06:28:08', 'sakshamta@test.com', 3392359463),
(332, 'Added a new sales order with id : 76 of status : draft', '2019-09-29 06:28:43', 'sakshamta@test.com', 3392359463),
(333, 'Added a new sales order with id : 77 of status : draft', '2019-09-29 06:37:49', 'sakshamta@test.com', 3392359463),
(334, 'Updated sales draft no : 77', '2019-09-29 06:38:13', 'sakshamta@test.com', 3392359463),
(335, 'Failed to update sales draft no : 77', '2019-09-29 06:39:27', 'sakshamta@test.com', 3392359463),
(336, 'Failed to update sales draft no : 77', '2019-09-29 06:43:37', 'sakshamta@test.com', 3392359463),
(337, 'Failed to update sales draft no : 77', '2019-09-29 06:44:46', 'sakshamta@test.com', 3392359463),
(338, 'Added a new sales order with id : 78 of status : draft', '2019-09-29 06:47:05', 'sakshamta@test.com', 3392359463),
(339, 'Updated sales draft no : 78', '2019-09-29 06:47:32', 'sakshamta@test.com', 3392359463),
(340, 'Failed to update sales draft no : 78', '2019-09-29 06:47:56', 'sakshamta@test.com', 3392359463),
(341, 'Added a new sales order with id : 79 of status : draft', '2019-09-29 06:49:41', 'sakshamta@test.com', 3392359463),
(342, 'Updated sales draft no : 79', '2019-09-29 06:50:08', 'sakshamta@test.com', 3392359463),
(343, 'Failed to update sales draft no : 79', '2019-09-29 06:50:52', 'sakshamta@test.com', 3392359463),
(344, 'Failed to update sales draft no : 79', '2019-09-29 06:55:17', 'sakshamta@test.com', 3392359463),
(345, 'Added a new sales order with id : 80 of status : draft', '2019-09-29 06:56:07', 'sakshamta@test.com', 3392359463),
(346, 'Updated sales draft no : 80', '2019-09-29 06:56:46', 'sakshamta@test.com', 3392359463),
(347, 'Failed to update sales draft no : 80', '2019-09-29 06:57:50', 'sakshamta@test.com', 3392359463),
(348, 'Failed to update sales draft no : 80', '2019-09-29 07:03:55', 'sakshamta@test.com', 3392359463),
(349, 'Failed to update sales draft no : 80', '2019-09-29 07:08:56', 'sakshamta@test.com', 3392359463),
(350, 'Failed to update sales draft no : 80', '2019-09-29 07:09:11', 'sakshamta@test.com', 3392359463),
(351, 'Failed to update sales draft no : 80', '2019-09-29 07:09:15', 'sakshamta@test.com', 3392359463),
(352, 'Failed to update sales draft no : 80', '2019-09-29 07:09:20', 'sakshamta@test.com', 3392359463),
(353, 'Failed to update sales draft no : 80', '2019-09-29 07:09:49', 'sakshamta@test.com', 3392359463),
(354, 'Added a new sales order with id : 81 of status : draft', '2019-09-29 07:12:27', 'sakshamta@test.com', 3392359463),
(355, 'Updated sales draft no : 81', '2019-09-29 07:12:52', 'sakshamta@test.com', 3392359463),
(356, 'Failed to update sales draft no : 81', '2019-09-29 07:13:30', 'sakshamta@test.com', 3392359463),
(357, 'Added a new sales order with id : 82 of status : draft', '2019-09-29 07:15:05', 'sakshamta@test.com', 3392359463),
(358, 'Failed to update sales draft no : 82', '2019-09-29 07:17:42', 'sakshamta@test.com', 3392359463),
(359, 'Failed to update sales draft no : 82', '2019-09-29 07:20:18', 'sakshamta@test.com', 3392359463),
(360, 'Added a new sales order with id : 83 of status : draft', '2019-09-29 07:23:27', 'sakshamta@test.com', 3392359463),
(361, 'Failed to update sales draft no : 83', '2019-09-29 07:24:04', 'sakshamta@test.com', 3392359463),
(362, 'Added a new sales order with id : 84 of status : draft', '2019-09-29 07:28:58', 'sakshamta@test.com', 3392359463),
(363, 'Updated sales draft no : 84', '2019-09-29 07:29:28', 'sakshamta@test.com', 3392359463),
(364, 'Updated sales draft no : 84', '2019-09-29 07:30:13', 'sakshamta@test.com', 3392359463),
(365, 'Failed to update sales draft no : 84', '2019-09-29 07:32:18', 'sakshamta@test.com', 3392359463),
(366, 'Failed to update sales draft no : 84', '2019-09-29 07:33:55', 'sakshamta@test.com', 3392359463),
(367, 'Failed to update sales draft no : 84', '2019-09-29 07:34:22', 'sakshamta@test.com', 3392359463),
(368, 'Failed to update sales draft no : 84', '2019-09-29 07:34:23', 'sakshamta@test.com', 3392359463),
(369, 'Updated sales draft no : 84', '2019-09-29 07:35:06', 'sakshamta@test.com', 3392359463),
(370, 'Updated sales draft no : 84', '2019-09-29 07:35:32', 'sakshamta@test.com', 3392359463),
(371, 'Failed to update sales draft no : 84', '2019-09-29 07:36:10', 'sakshamta@test.com', 3392359463),
(372, 'Failed to update sales draft no : 84', '2019-09-29 07:39:03', 'sakshamta@test.com', 3392359463),
(373, 'Updated sales draft no : 84', '2019-09-29 07:41:06', 'sakshamta@test.com', 3392359463),
(374, 'Failed to update sales draft no : 84', '2019-09-29 07:41:28', 'sakshamta@test.com', 3392359463),
(375, 'Failed to update sales draft no : 84', '2019-09-29 07:49:56', 'sakshamta@test.com', 3392359463),
(376, 'Failed to update sales draft no : 84', '2019-09-29 07:53:15', 'sakshamta@test.com', 3392359463),
(377, 'Logged In', '2019-09-29 07:59:58', 'sakshamta@test.com', 3392359475),
(378, 'Logged In', '2019-09-29 07:59:58', 'sakshamta@test.com', 3392359475),
(379, 'Logged In', '2019-09-29 07:59:58', 'sakshamta@test.com', 3392359475),
(380, 'Logged In', '2019-09-29 07:59:58', 'sakshamta@test.com', 3392359475),
(381, 'Logged In', '2019-09-29 08:00:01', 'sakshamta@test.com', 3392359475),
(382, 'Added a new sales order with id : 85 of status : draft', '2019-09-29 08:05:26', 'sakshamta@test.com', 3392359475),
(383, 'Updated sales draft no : 85', '2019-09-29 08:06:00', 'sakshamta@test.com', 3392359475),
(384, 'Updated sales draft no : 85', '2019-09-29 08:06:34', 'sakshamta@test.com', 3392359475),
(385, 'Updated sales draft no : 85', '2019-09-29 08:06:56', 'sakshamta@test.com', 3392359475),
(386, 'Failed to update sales draft no : 85', '2019-09-29 08:07:21', 'sakshamta@test.com', 3392359475),
(387, 'Failed to update sales draft no : 85', '2019-09-29 08:16:24', 'sakshamta@test.com', 3392359475),
(388, 'Confirmed sales order no : 85', '2019-09-29 08:16:42', 'sakshamta@test.com', 3392359475),
(389, 'Failed to update delivered quantity for sales order no : 85', '2019-09-29 08:34:09', 'sakshamta@test.com', 3392359475),
(390, 'Failed to update delivered quantity for sales order no : 85', '2019-09-29 08:34:18', 'sakshamta@test.com', 3392359475),
(391, 'Updated delivered quantity for sales order no : 85', '2019-09-29 08:34:50', 'sakshamta@test.com', 3392359475),
(392, 'Added a new sales order with id : 86 of status : draft', '2019-09-29 08:38:11', 'sakshamta@test.com', 3392359475),
(393, 'Updated sales draft no : 86', '2019-09-29 08:38:44', 'sakshamta@test.com', 3392359475),
(394, 'Updated sales draft no : 86', '2019-09-29 08:38:55', 'sakshamta@test.com', 3392359475),
(395, 'Updated sales draft no : 86', '2019-09-29 08:39:09', 'sakshamta@test.com', 3392359475),
(396, 'Failed to update sales draft no : 86', '2019-09-29 08:39:34', 'sakshamta@test.com', 3392359475),
(397, 'Updated sales draft no : 86', '2019-09-29 08:39:51', 'sakshamta@test.com', 3392359475),
(398, 'Added a new sales order with id : 87 of status : confirmed', '2019-09-29 09:17:03', 'sakshamta@test.com', 3392359475),
(399, 'Failed to cancel sales order no : 87', '2019-09-29 09:17:16', 'sakshamta@test.com', 3392359475),
(400, 'Failed to cancel sales order no : 87', '2019-09-29 09:18:01', 'sakshamta@test.com', 3392359475),
(401, 'Failed to cancel sales order no : 87', '2019-09-29 09:19:33', 'sakshamta@test.com', 3392359475),
(402, 'Failed to cancel sales order no : 87', '2019-09-29 09:19:33', 'sakshamta@test.com', 3392359475),
(403, 'Failed to cancel sales order no : 87', '2019-09-29 09:20:20', 'sakshamta@test.com', 3392359475),
(404, 'Failed to cancel sales order no : 87', '2019-09-29 09:20:46', 'sakshamta@test.com', 3392359475),
(405, 'Failed to cancel sales order no : 87', '2019-09-29 09:24:49', 'sakshamta@test.com', 3392359475),
(406, 'Failed to cancel sales order no : 87', '2019-09-29 09:25:57', 'sakshamta@test.com', 3392359475),
(407, 'Failed to cancel sales order no : 87', '2019-09-29 09:26:22', 'sakshamta@test.com', 3392359475),
(408, 'Failed to cancel sales order no : 87', '2019-09-29 09:27:20', 'sakshamta@test.com', 3392359475),
(409, 'Failed to cancel sales order no : 87', '2019-09-29 09:27:41', 'sakshamta@test.com', 3392359475),
(410, 'Failed to cancel sales order no : 87', '2019-09-29 09:28:16', 'sakshamta@test.com', 3392359475),
(411, 'Added a new sales order with id : 88 of status : confirmed', '2019-09-29 10:09:41', 'sakshamta@test.com', 3392359475),
(412, 'Failed to cancel sales order no : 88', '2019-09-29 10:09:56', 'sakshamta@test.com', 3392359475),
(413, 'Added a new sales order with id : 89 of status : confirmed', '2019-09-29 10:14:14', 'sakshamta@test.com', 3392359475),
(414, 'Failed to cancel sales order no : 89', '2019-09-29 10:14:19', 'sakshamta@test.com', 3392359475),
(415, 'Confirmed sales order no : 89', '2019-09-29 10:17:08', 'sakshamta@test.com', 3392359475),
(416, 'Failed to cancel sales order no : 89', '2019-09-29 10:17:12', 'sakshamta@test.com', 3392359475),
(417, 'Confirmed sales order no : 89', '2019-09-29 10:18:23', 'sakshamta@test.com', 3392359475),
(418, 'Cancelled sales order no : 89', '2019-09-29 10:18:34', 'sakshamta@test.com', 3392359475),
(419, 'Added a new sales order with id : 90 of status : confirmed', '2019-09-29 10:19:58', 'sakshamta@test.com', 3392359475),
(420, 'Cancelled sales order no : 90', '2019-09-29 10:22:00', 'sakshamta@test.com', 3392359475),
(421, 'Confirmed sales order no : 90', '2019-09-29 10:22:35', 'sakshamta@test.com', 3392359475),
(422, 'Cancelled sales order no : 90', '2019-09-29 10:22:53', 'sakshamta@test.com', 3392359475),
(423, 'Confirmed sales order no : 90', '2019-09-29 10:24:46', 'sakshamta@test.com', 3392359475),
(424, 'Cancelled sales order no : 90', '2019-09-29 10:24:54', 'sakshamta@test.com', 3392359475),
(425, 'Confirmed sales order no : 90', '2019-09-29 10:26:25', 'sakshamta@test.com', 3392359475),
(426, 'Cancelled sales order no : 90', '2019-09-29 10:26:28', 'sakshamta@test.com', 3392359475),
(427, 'Confirmed sales order no : 90', '2019-09-29 10:29:58', 'sakshamta@test.com', 3392359475),
(428, 'Cancelled sales order no : 90', '2019-09-29 10:30:01', 'sakshamta@test.com', 3392359475),
(429, 'Confirmed sales order no : 90', '2019-09-29 10:33:46', 'sakshamta@test.com', 3392359475),
(430, 'Failed to cancel sales order no : 90', '2019-09-29 10:34:02', 'sakshamta@test.com', 3392359475),
(431, 'Cancelled sales order no : 90', '2019-09-29 10:34:40', 'sakshamta@test.com', 3392359475),
(432, 'Added a new sales order with id : 91 of status : draft', '2019-09-29 10:45:54', 'sakshamta@test.com', 3392359475),
(433, 'Deleted sales draft no :  91', '2019-09-29 10:45:58', 'sakshamta@test.com', 3392359475),
(434, 'Updated sales draft no : 90', '2019-09-29 11:14:47', 'sakshamta@test.com', 3392359475),
(435, 'Confirmed sales order no : 90', '2019-09-29 11:14:50', 'sakshamta@test.com', 3392359475),
(436, 'Updated delivered quantity for sales order no : 90', '2019-09-29 11:22:47', 'sakshamta@test.com', 3392359475),
(437, 'Logged In', '2019-09-30 10:03:25', 'sakshamta@test.com', 3392359475),
(438, 'Added User :boqyd@mailinator.com', '2019-09-30 10:09:01', 'sakshamta@test.com', 3392359475),
(439, 'Sent verification email :boqyd@mailinator.com', '2019-09-30 10:09:08', 'sakshamta@test.com', 3392359475),
(440, 'Added a new sales order with id : 91 of status : confirmed', '2019-09-30 10:32:32', 'sakshamta@test.com', 3392359475),
(441, 'Added a new sales order with id : 92 of status : draft', '2019-09-30 10:33:44', 'sakshamta@test.com', 3392359475),
(442, 'Added a new sales order with id : 93 of status : confirmed', '2019-09-30 10:33:50', 'sakshamta@test.com', 3392359475),
(443, 'Updated delivered quantity for sales order no : 93', '2019-09-30 10:44:20', 'sakshamta@test.com', 3392359475),
(444, 'Updated delivered quantity for sales order no : 91', '2019-09-30 10:46:28', 'sakshamta@test.com', 3392359475),
(445, 'Failed to update status to \"fulfilled\" for sales order no : 91', '2019-09-30 10:46:31', 'sakshamta@test.com', 3392359475),
(446, 'Failed to update status to \"fulfilled\" for sales order no : 91', '2019-09-30 10:46:41', 'sakshamta@test.com', 3392359475),
(447, 'Failed to update status to \"fulfilled\" for sales order no : 91', '2019-09-30 10:47:05', 'sakshamta@test.com', 3392359475),
(448, 'Updated status to \"fulfilled\" for  sales order no : 91', '2019-09-30 10:47:15', 'sakshamta@test.com', 3392359475),
(449, 'undefinedmiribokemy@mailinator.com', '2019-09-30 10:55:45', 'sakshamta@test.com', 3392359475),
(450, 'undefinedmiribokemy@mailinator.com', '2019-09-30 10:55:47', 'sakshamta@test.com', 3392359475),
(451, 'undefinedmirisbokemy@mailinator.com', '2019-09-30 10:55:51', 'sakshamta@test.com', 3392359475),
(452, 'undefinedmixahydy@mailinator.net', '2019-09-30 10:57:44', 'sakshamta@test.com', 3392359475),
(453, 'undefinedmixahydy@mailinator.net', '2019-09-30 10:57:47', 'sakshamta@test.com', 3392359475),
(454, 'undefinedhuzaxvcvcecoby@mailinator.com', '2019-09-30 10:58:07', 'sakshamta@test.com', 3392359475),
(455, 'undefinedhuzaxvcvcecoby@mailinator.com', '2019-09-30 10:58:09', 'sakshamta@test.com', 3392359475),
(456, 'undefinedhuzweaxvcvcecoby@mailinator.com', '2019-09-30 10:59:03', 'sakshamta@test.com', 3392359475),
(457, 'undefinedwisihu@mailinator.com', '2019-09-30 10:59:10', 'sakshamta@test.com', 3392359475),
(458, 'undefinedwisihu@mailinator.com', '2019-09-30 10:59:11', 'sakshamta@test.com', 3392359475),
(459, 'undefinedwisishu@mailinator.com', '2019-09-30 10:59:16', 'sakshamta@test.com', 3392359475),
(460, 'undefinedlasspa@mailinator.net', '2019-09-30 10:59:37', 'sakshamta@test.com', 3392359475),
(461, 'undefinedlasspa@mailinator.net', '2019-09-30 10:59:39', 'sakshamta@test.com', 3392359475),
(462, 'undefinedhijusssa@mailinator.com', '2019-09-30 11:00:25', 'sakshamta@test.com', 3392359475),
(463, 'undefinedhijusssa@mailinator.com', '2019-09-30 11:00:27', 'sakshamta@test.com', 3392359475),
(465, 'Logged In', '2019-10-01 06:24:40', 'sakshamta@test.com', 3392359475),
(466, 'Logged In', '2019-10-01 06:24:40', 'sakshamta@test.com', 3392359475),
(467, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:26:26', 'sakshamta@test.com', 3392359475),
(468, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:46:32', 'sakshamta@test.com', 3392359475),
(469, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:47:47', 'sakshamta@test.com', 3392359475),
(470, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:47:47', 'sakshamta@test.com', 3392359475),
(471, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:50:15', 'sakshamta@test.com', 3392359475),
(472, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:58:13', 'sakshamta@test.com', 3392359475),
(473, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 06:59:57', 'sakshamta@test.com', 3392359475);
INSERT INTO `activity_log` (`id`, `log_event`, `event_timestamp`, `log_user`, `ip`) VALUES
(474, 'Succesfully updated permissions for user : super@test.com', '2019-10-01 07:00:04', 'sakshamta@test.com', 3392359475),
(475, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:06:56', 'sakshamta@test.com', 3392359475),
(476, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:07:08', 'sakshamta@test.com', 3392359475),
(477, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:07:13', 'sakshamta@test.com', 3392359475),
(478, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:07:41', 'sakshamta@test.com', 3392359475),
(479, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:08:00', 'sakshamta@test.com', 3392359475),
(480, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:08:08', 'sakshamta@test.com', 3392359475),
(481, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:09:20', 'sakshamta@test.com', 3392359475),
(482, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:09:48', 'sakshamta@test.com', 3392359475),
(483, 'Succesfully updated permissions for user : admin@test.com', '2019-10-01 07:10:07', 'sakshamta@test.com', 3392359475),
(484, 'Logged In', '2019-10-02 14:21:53', 'sakshamta@test.com', 3392359475),
(485, 'Logged In', '2019-10-13 05:15:20', 'sakshamta@test.com', 3392359475),
(486, 'Supplier has been addednaduzuzyhu@mailinator.com', '2019-10-13 05:16:56', 'sakshamta@test.com', 3392359475),
(487, 'Purchase order failed to  added ', '2019-10-13 05:17:02', 'sakshamta@test.com', 3392359475),
(488, 'Purchase order failed to  added ', '2019-10-13 05:17:17', 'sakshamta@test.com', 3392359475),
(489, 'Purchase order failed to  added ', '2019-10-13 05:45:00', 'sakshamta@test.com', 3392359475),
(490, 'Purchase order failed to  added ', '2019-10-13 05:45:43', 'sakshamta@test.com', 3392359475),
(491, 'Purchase order failed to  added ', '2019-10-13 05:45:54', 'sakshamta@test.com', 3392359475),
(492, 'Purchase order failed to  added ', '2019-10-13 05:52:25', 'sakshamta@test.com', 3392359475),
(493, 'Purchase order failed to  added ', '2019-10-13 05:52:40', 'sakshamta@test.com', 3392359475),
(494, 'Purchase order failed to  added ', '2019-10-13 05:53:33', 'sakshamta@test.com', 3392359475),
(495, 'Purchase order successfully added and quantity added', '2019-10-13 06:04:01', 'sakshamta@test.com', 3392359475),
(496, 'Purchase order successfully added and quantity added', '2019-10-13 06:10:27', 'sakshamta@test.com', 3392359475),
(497, 'Purchase order failed to  added ', '2019-10-13 06:13:54', 'sakshamta@test.com', 3392359475),
(498, 'Purchase order failed to  added ', '2019-10-13 06:16:53', 'sakshamta@test.com', 3392359475),
(499, 'Purchase order failed to  added ', '2019-10-13 06:17:29', 'sakshamta@test.com', 3392359475),
(500, 'Purchase order successfully added and quantity added', '2019-10-13 06:17:41', 'sakshamta@test.com', 3392359475),
(501, 'Purchase order successfully added and quantity added', '2019-10-13 06:18:31', 'sakshamta@test.com', 3392359475),
(502, 'Purchase order successfully added and quantity added', '2019-10-13 07:04:29', 'sakshamta@test.com', 3392359475),
(503, 'Failed to update purchase draft no : 11', '2019-10-13 07:13:36', 'sakshamta@test.com', 3392359475),
(504, 'Failed to update purchase draft no : 11', '2019-10-13 07:14:36', 'sakshamta@test.com', 3392359475),
(505, 'Failed to update purchase draft no : 11', '2019-10-13 07:14:47', 'sakshamta@test.com', 3392359475),
(506, 'Failed to update purchase draft no : 11', '2019-10-13 07:14:52', 'sakshamta@test.com', 3392359475),
(507, 'Failed to update purchase draft no : 11', '2019-10-13 07:15:09', 'sakshamta@test.com', 3392359475),
(508, 'Failed to update purchase draft no : 11', '2019-10-13 07:15:28', 'sakshamta@test.com', 3392359475),
(509, 'Failed to update purchase draft no : 11', '2019-10-13 07:15:35', 'sakshamta@test.com', 3392359475),
(510, 'Failed to update purchase draft no : 11', '2019-10-13 07:16:04', 'sakshamta@test.com', 3392359475),
(511, 'Failed to update purchase draft no : 11', '2019-10-13 07:16:50', 'sakshamta@test.com', 3392359475),
(512, 'Failed to update purchase draft no : 11', '2019-10-13 07:17:11', 'sakshamta@test.com', 3392359475),
(513, 'Failed to update purchase draft no : 11', '2019-10-13 07:18:44', 'sakshamta@test.com', 3392359475),
(514, 'Failed to update purchase draft no : 11', '2019-10-13 07:19:14', 'sakshamta@test.com', 3392359475),
(515, 'Failed to update purchase draft no : 11', '2019-10-13 07:19:39', 'sakshamta@test.com', 3392359475),
(516, 'Failed to update purchase draft no : 11', '2019-10-13 07:20:25', 'sakshamta@test.com', 3392359475),
(517, 'Failed to update purchase draft no : 11', '2019-10-13 07:23:06', 'sakshamta@test.com', 3392359475),
(518, 'Failed to update purchase draft no : 11', '2019-10-13 07:23:54', 'sakshamta@test.com', 3392359475),
(519, 'Failed to update purchase draft no : 11', '2019-10-13 07:24:31', 'sakshamta@test.com', 3392359475),
(520, 'Failed to update purchase draft no : 11', '2019-10-13 07:27:55', 'sakshamta@test.com', 3392359475),
(521, 'Failed to update purchase draft no : 11', '2019-10-13 07:28:43', 'sakshamta@test.com', 3392359475),
(522, 'Failed to update purchase draft no : 11', '2019-10-13 07:35:40', 'sakshamta@test.com', 3392359475),
(523, 'Updated Purchase draft no : 11', '2019-10-13 07:36:42', 'sakshamta@test.com', 3392359475),
(524, 'Failed to update purchase draft no : 11', '2019-10-13 07:39:18', 'sakshamta@test.com', 3392359475),
(525, 'Failed to update purchase draft no : 11', '2019-10-13 07:40:04', 'sakshamta@test.com', 3392359475),
(526, 'Failed to update purchase draft no : 11', '2019-10-13 07:41:28', 'sakshamta@test.com', 3392359475),
(527, 'Failed to update purchase draft no : 11', '2019-10-13 07:41:51', 'sakshamta@test.com', 3392359475),
(528, 'Failed to update purchase draft no : 11', '2019-10-13 07:42:34', 'sakshamta@test.com', 3392359475),
(529, 'Failed to update purchase draft no : 11', '2019-10-13 07:42:45', 'sakshamta@test.com', 3392359475),
(530, 'Failed to update purchase draft no : 11', '2019-10-13 07:43:11', 'sakshamta@test.com', 3392359475),
(531, 'Failed to update purchase draft no : 11', '2019-10-13 07:43:46', 'sakshamta@test.com', 3392359475),
(532, 'Updated Purchase draft no : 11', '2019-10-13 07:44:15', 'sakshamta@test.com', 3392359475),
(533, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:12:04', 'sakshamta@test.com', 3392359475),
(534, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:12:09', 'sakshamta@test.com', 3392359475),
(535, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:12:20', 'sakshamta@test.com', 3392359475),
(536, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:13:23', 'sakshamta@test.com', 3392359475),
(537, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:13:30', 'sakshamta@test.com', 3392359475),
(538, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:13:51', 'sakshamta@test.com', 3392359475),
(539, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:14:29', 'sakshamta@test.com', 3392359475),
(540, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:15:54', 'sakshamta@test.com', 3392359475),
(541, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:16:57', 'sakshamta@test.com', 3392359475),
(542, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:17:22', 'sakshamta@test.com', 3392359475),
(543, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:17:38', 'sakshamta@test.com', 3392359475),
(544, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:19:18', 'sakshamta@test.com', 3392359475),
(545, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:19:24', 'sakshamta@test.com', 3392359475),
(546, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:19:28', 'sakshamta@test.com', 3392359475),
(547, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:20:51', 'sakshamta@test.com', 3392359475),
(548, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:21:12', 'sakshamta@test.com', 3392359475),
(549, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:21:18', 'sakshamta@test.com', 3392359475),
(550, 'Failed to add a new sales order with status  confirmed', '2019-10-13 08:21:36', 'sakshamta@test.com', 3392359475),
(551, 'Added a new sales order with id : 112 of status : confirmed', '2019-10-13 08:22:57', 'sakshamta@test.com', 3392359475),
(552, 'Updated delivered quantity for sales order no : 112', '2019-10-13 08:23:15', 'sakshamta@test.com', 3392359475),
(553, 'Updated status to \"fulfilled\" for  sales order no : 112', '2019-10-13 08:23:23', 'sakshamta@test.com', 3392359475),
(554, 'Purchase order successfully added and quantity added', '2019-10-13 08:52:10', 'sakshamta@test.com', 3392359475),
(555, 'Updated received quantity for purchase order no : 12', '2019-10-13 08:52:26', 'sakshamta@test.com', 3392359475),
(556, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:00:15', 'sakshamta@test.com', 3392359475),
(557, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:00:50', 'sakshamta@test.com', 3392359475),
(558, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:04:47', 'sakshamta@test.com', 3392359475),
(559, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:04:55', 'sakshamta@test.com', 3392359475),
(560, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:07:42', 'sakshamta@test.com', 3392359475),
(561, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:07:47', 'sakshamta@test.com', 3392359475),
(562, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:09:25', 'sakshamta@test.com', 3392359475),
(563, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:09:42', 'sakshamta@test.com', 3392359475),
(564, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:10:47', 'sakshamta@test.com', 3392359475),
(565, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:11:25', 'sakshamta@test.com', 3392359475),
(566, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:11:54', 'sakshamta@test.com', 3392359475),
(567, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:11:57', 'sakshamta@test.com', 3392359475),
(568, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:12:18', 'sakshamta@test.com', 3392359475),
(569, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:13:07', 'sakshamta@test.com', 3392359475),
(570, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:13:20', 'sakshamta@test.com', 3392359475),
(571, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:14:17', 'sakshamta@test.com', 3392359475),
(572, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:17:05', 'sakshamta@test.com', 3392359475),
(573, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:18:34', 'sakshamta@test.com', 3392359475),
(574, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:18:36', 'sakshamta@test.com', 3392359475),
(575, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:19:05', 'sakshamta@test.com', 3392359475),
(576, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:19:12', 'sakshamta@test.com', 3392359475),
(577, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:19:25', 'sakshamta@test.com', 3392359475),
(578, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:19:45', 'sakshamta@test.com', 3392359475),
(579, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:21:27', 'sakshamta@test.com', 3392359475),
(580, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:21:39', 'sakshamta@test.com', 3392359475),
(581, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:24:55', 'sakshamta@test.com', 3392359475),
(582, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:25:05', 'sakshamta@test.com', 3392359475),
(583, 'Updated received quantity for purchase order no : 12', '2019-10-13 09:25:44', 'sakshamta@test.com', 3392359475),
(584, 'Confirmed sales order no : 92', '2019-10-13 11:33:28', 'sakshamta@test.com', 3392359475),
(585, 'Updated Purchase draft no : 4', '2019-10-13 12:01:09', 'sakshamta@test.com', 3392359475),
(586, 'Logged In', '2019-10-14 08:06:11', 'sakshamta@test.com', 3392359475),
(587, 'Logged In', '2019-10-14 08:06:11', 'sakshamta@test.com', 3392359475),
(588, 'Confirmed sales order no : 90', '2019-10-14 08:41:11', 'sakshamta@test.com', 3392359475),
(589, 'Updated Purchase draft no : 5', '2019-10-14 09:39:48', 'sakshamta@test.com', 3392359475),
(590, 'Purchase order successfully added and quantity added', '2019-10-14 09:52:24', 'sakshamta@test.com', 3392359475),
(591, 'New Product added successfully', '2019-10-14 10:02:03', 'sakshamta@test.com', 3392359475),
(592, 'New Product added successfully', '2019-10-14 10:04:17', 'sakshamta@test.com', 3392359475),
(593, 'Supplier has been addedpivicovo@mailinator.com', '2019-10-14 10:05:45', 'sakshamta@test.com', 3392359475),
(594, 'Supplier has been addedjarequ@mailinator.net', '2019-10-14 10:05:59', 'sakshamta@test.com', 3392359475),
(595, 'Purchase order successfully added and quantity added', '2019-10-14 10:09:01', 'sakshamta@test.com', 3392359475),
(596, 'Purchase order successfully added and quantity added', '2019-10-14 10:09:10', 'sakshamta@test.com', 3392359475),
(597, 'Purchase order successfully added and quantity added', '2019-10-14 10:09:27', 'sakshamta@test.com', 3392359475),
(598, 'Added a new sales order with id : 113 of status : confirmed', '2019-10-14 10:09:41', 'sakshamta@test.com', 3392359475),
(599, 'Added a new sales order with id : 114 of status : confirmed', '2019-10-14 10:10:57', 'sakshamta@test.com', 3392359475),
(600, 'Updated delivered quantity for sales order no : 114', '2019-10-14 10:12:08', 'sakshamta@test.com', 3392359475),
(601, 'Purchase order successfully added and quantity added', '2019-10-14 11:18:01', 'sakshamta@test.com', 3392359475),
(602, 'Updated delivered quantity for sales order no : 90', '2019-10-14 11:18:10', 'sakshamta@test.com', 3392359475),
(603, 'Purchase order successfully added and quantity added', '2019-10-14 11:22:46', 'sakshamta@test.com', 3392359475),
(604, 'Purchase order successfully added and quantity added', '2019-10-14 11:37:00', 'sakshamta@test.com', 3392359475),
(605, 'Purchase order successfully added and quantity added', '2019-10-14 11:40:44', 'sakshamta@test.com', 3392359475),
(606, 'Updated status to \"fulfilled\" for  sales order no : 90', '2019-10-14 11:40:56', 'sakshamta@test.com', 3392359475),
(607, 'Logged In', '2019-10-15 08:14:40', 'sakshamta@test.com', 3392359475),
(608, 'Updated sales draft no : 91', '2019-10-15 08:18:14', 'sakshamta@test.com', 3392359475),
(609, 'Added a new sales order with id : 115 of status : confirmed', '2019-10-15 08:24:26', 'sakshamta@test.com', 3392359475),
(610, 'Updated Purchase draft no : 10', '2019-10-15 08:44:41', 'sakshamta@test.com', 3392359475),
(611, 'Updated Purchase draft no : 10', '2019-10-15 08:44:53', 'sakshamta@test.com', 3392359475),
(612, 'Updated Purchase draft no : 10', '2019-10-15 08:48:56', 'sakshamta@test.com', 3392359475),
(613, 'Added a new sales order with id : 116 of status : confirmed', '2019-10-15 09:00:21', 'sakshamta@test.com', 3392359475),
(614, 'Added a new sales order with id : 117 of status : confirmed', '2019-10-15 09:00:40', 'sakshamta@test.com', 3392359475),
(615, 'Added a new sales order with id : 118 of status : draft', '2019-10-15 09:01:26', 'sakshamta@test.com', 3392359475),
(616, 'Updated sales draft no : 118', '2019-10-15 09:01:31', 'sakshamta@test.com', 3392359475),
(617, 'Deleted sales draft no :  118', '2019-10-15 09:01:35', 'sakshamta@test.com', 3392359475),
(618, 'Confirmed sales order no : 91', '2019-10-15 09:01:40', 'sakshamta@test.com', 3392359475),
(619, 'Confirmed sales order no : 92', '2019-10-15 09:02:20', 'sakshamta@test.com', 3392359475),
(620, 'Updated delivered quantity for sales order no : 92', '2019-10-15 09:03:07', 'sakshamta@test.com', 3392359475),
(621, 'Purchase order successfully added and quantity added', '2019-10-15 09:03:20', 'sakshamta@test.com', 3392359475),
(622, 'Updated Purchase draft no : 21', '2019-10-15 09:03:24', 'sakshamta@test.com', 3392359475),
(623, 'Deleted sales draft no :  93', '2019-10-15 09:56:58', 'sakshamta@test.com', 3392359475),
(624, 'Deleted sales draft no :  112', '2019-10-15 09:57:42', 'sakshamta@test.com', 3392359475),
(625, 'Successfully added the new Category', '2019-10-15 09:59:12', 'sakshamta@test.com', 3392359475),
(626, 'Updated Category Successfully', '2019-10-15 10:00:19', 'sakshamta@test.com', 3392359475),
(627, 'Successfully added the new Category', '2019-10-15 10:04:00', 'sakshamta@test.com', 3392359475),
(628, 'Successfully added the new Category', '2019-10-15 10:04:03', 'sakshamta@test.com', 3392359475),
(629, 'Successfully added the new Category', '2019-10-15 10:04:06', 'sakshamta@test.com', 3392359475),
(630, 'Duplicate Category item tried to be added', '2019-10-15 10:04:08', 'sakshamta@test.com', 3392359475),
(631, 'Duplicate Category item tried to be added', '2019-10-15 10:04:11', 'sakshamta@test.com', 3392359475),
(632, 'Duplicate Category item tried to be added', '2019-10-15 10:04:12', 'sakshamta@test.com', 3392359475),
(633, 'Successfully added the new Category', '2019-10-15 10:04:14', 'sakshamta@test.com', 3392359475),
(634, 'Duplicate Category item tried to be added', '2019-10-15 10:04:15', 'sakshamta@test.com', 3392359475),
(635, 'Duplicate Category item tried to be added', '2019-10-15 10:04:16', 'sakshamta@test.com', 3392359475),
(636, 'Duplicate Category item tried to be added', '2019-10-15 10:04:17', 'sakshamta@test.com', 3392359475),
(637, 'Successfully added the new Category', '2019-10-15 10:04:18', 'sakshamta@test.com', 3392359475),
(638, 'Successfully added the new Category', '2019-10-15 10:04:20', 'sakshamta@test.com', 3392359475),
(639, 'Successfully added the new Category', '2019-10-15 10:04:22', 'sakshamta@test.com', 3392359475),
(640, 'Duplicate Category item tried to be added', '2019-10-15 10:04:25', 'sakshamta@test.com', 3392359475),
(641, 'Successfully added the new Category', '2019-10-15 10:05:23', 'sakshamta@test.com', 3392359475),
(642, 'Duplicate Category item tried to be added', '2019-10-15 10:05:25', 'sakshamta@test.com', 3392359475),
(643, 'Duplicate Category item tried to be added', '2019-10-15 10:05:29', 'sakshamta@test.com', 3392359475),
(644, 'Successfully added the new Category', '2019-10-15 10:07:39', 'sakshamta@test.com', 3392359475),
(645, 'Duplicate Category item tried to be added', '2019-10-15 10:07:40', 'sakshamta@test.com', 3392359475),
(646, 'Duplicate Category item tried to be added', '2019-10-15 10:08:05', 'sakshamta@test.com', 3392359475),
(647, 'Duplicate Category item tried to be added', '2019-10-15 10:08:46', 'sakshamta@test.com', 3392359475),
(648, 'Duplicate Category item tried to be added', '2019-10-15 10:08:50', 'sakshamta@test.com', 3392359475),
(649, 'Duplicate Category item tried to be added', '2019-10-15 10:10:58', 'sakshamta@test.com', 3392359475),
(650, 'Duplicate Category item tried to be added', '2019-10-15 10:11:01', 'sakshamta@test.com', 3392359475),
(651, 'Successfully added the new Category', '2019-10-15 10:11:29', 'sakshamta@test.com', 3392359475),
(652, 'Successfully added the new Category', '2019-10-15 10:17:41', 'sakshamta@test.com', 3392359475),
(653, 'Duplicate Category item tried to be added', '2019-10-15 10:17:43', 'sakshamta@test.com', 3392359475),
(654, 'Successfully added the new Category', '2019-10-15 10:17:47', 'sakshamta@test.com', 3392359475),
(655, 'Successfully added the new Category', '2019-10-15 10:17:48', 'sakshamta@test.com', 3392359475),
(656, 'Successfully added the new Category', '2019-10-15 10:17:50', 'sakshamta@test.com', 3392359475),
(657, 'Successfully added the new Category', '2019-10-15 10:17:51', 'sakshamta@test.com', 3392359475),
(658, 'Updated Category Successfully', '2019-10-15 10:21:37', 'sakshamta@test.com', 3392359475),
(659, 'Successfully added the new Category', '2019-10-15 10:21:50', 'sakshamta@test.com', 3392359475),
(660, 'Updated Category Successfully', '2019-10-15 10:21:56', 'sakshamta@test.com', 3392359475),
(661, 'Delete Product : - 6', '2019-10-15 10:25:29', 'sakshamta@test.com', 3392359475),
(662, 'Successfully added the new Category', '2019-10-15 10:27:37', 'sakshamta@test.com', 3392359475),
(663, 'Successfully added the new Category', '2019-10-15 10:27:41', 'sakshamta@test.com', 3392359475),
(664, 'Successfully added the new Category', '2019-10-15 10:27:45', 'sakshamta@test.com', 3392359475),
(665, 'New Product added successfully', '2019-10-15 10:31:12', 'sakshamta@test.com', 3392359475),
(666, 'Updated Product Successfully', '2019-10-15 10:34:29', 'sakshamta@test.com', 3392359475),
(667, 'Updated Product Successfully', '2019-10-15 10:34:49', 'sakshamta@test.com', 3392359475),
(668, 'Updated Product Successfully', '2019-10-15 10:34:57', 'sakshamta@test.com', 3392359475),
(669, 'Delete Product : - 19', '2019-10-15 10:36:09', 'sakshamta@test.com', 3392359475),
(670, 'Succesfully updated permissions for user : admin@test.com', '2019-10-15 10:38:02', 'sakshamta@test.com', 3392359475),
(671, 'Logged Out', '2019-10-15 10:40:49', 'sakshamta@test.com', 3392359475),
(672, 'Logged In', '2019-10-15 10:40:57', 'sakshamta@test.com', 1848410030),
(673, 'Logged Out', '2019-10-15 10:41:07', 'sakshamta@test.com', 1848410030),
(674, 'Logged In', '2019-10-15 10:41:15', 'user@test.com', 1848410030),
(675, 'Checked In', '2019-10-15 10:46:26', 'user@test.com', 1848410030),
(676, 'checked Out', '2019-10-15 10:52:25', 'user@test.com', 1848410030),
(677, 'Logged In', '2019-10-15 10:57:47', 'user@test.com', 1848410030),
(678, 'Checked In', '2019-10-15 10:58:08', 'user@test.com', 1848410030),
(679, 'checked Out', '2019-10-15 11:00:24', 'user@test.com', 1848410030),
(680, 'Logged In', '2019-10-15 11:00:37', 'user@test.com', 1848410030),
(681, 'Checked In', '2019-10-15 11:00:40', 'user@test.com', 1848410030),
(682, 'checked Out', '2019-10-15 11:00:45', 'user@test.com', 1848410030),
(683, 'Logged Out', '2019-10-15 11:00:56', 'user@test.com', 1848410030),
(684, 'Logged In', '2019-10-15 11:02:13', 'sakshamta@test.com', 1848410030),
(687, 'Logged Out', '2019-10-15 11:06:13', 'sakshamta@test.com', 1848410030),
(688, 'Logged In', '2019-10-15 11:06:19', 'sakshamta@test.com', 1848410030),
(690, 'Logged Out', '2019-10-15 11:07:30', 'sakshamta@test.com', 1848410030),
(691, 'Logged In', '2019-10-15 11:07:38', 'sakshamta@test.com', 1848410030),
(692, 'Added User :pilito@mailinator.com', '2019-10-15 11:08:02', 'sakshamta@test.com', 1848410030),
(693, 'Sent verification email :pilito@mailinator.com', '2019-10-15 11:08:06', 'sakshamta@test.com', 1848410030),
(695, 'Logged Out', '2019-10-15 11:09:05', 'sakshamta@test.com', 1848410030),
(696, 'Logged In', '2019-10-15 11:09:40', 'sakshamta@test.com', 1848410030),
(697, 'Logged Out', '2019-10-15 11:10:47', 'sakshamta@test.com', 1848410030),
(698, 'Logged In', '2019-10-15 11:10:56', 'sakshamta@test.com', 1848410030),
(699, 'Logged Out', '2019-10-15 11:11:13', 'sakshamta@test.com', 1848410030),
(700, 'Logged In', '2019-10-15 11:11:48', 'sakshamta@test.com', 1848410030),
(701, 'Logged Out', '2019-10-15 11:11:54', 'sakshamta@test.com', 1848410030),
(702, 'Failed to Log In', '2019-10-15 11:12:00', 'sakshamta@test.com', 1848410030),
(703, 'Failed to Log In', '2019-10-15 11:13:23', 'sakshamta@test.com', 1848410030),
(704, 'Failed to Log In', '2019-10-15 11:13:24', 'sakshamta@test.com', 1848410030),
(705, 'Failed to Log In', '2019-10-15 11:13:26', 'sakshamta@test.com', 1848410030),
(706, 'Failed to Log In', '2019-10-15 11:13:27', 'sakshamta@test.com', 1848410030),
(707, 'Failed to Log In', '2019-10-15 11:13:29', 'sakshamta@test.com', 1848410030),
(708, 'Account deactivated', '2019-10-15 11:13:33', 'sakshamta@test.com', 1848410030),
(709, 'Logged In', '2019-10-15 11:14:53', 'sakshamta@test.com', 1848410030),
(710, 'Updated : super1@test.com', '2019-10-15 11:15:10', 'sakshamta@test.com', 1848410030),
(711, 'Added User :kywilada@mailinator.com', '2019-10-15 11:15:54', 'sakshamta@test.com', 1848410030),
(712, 'Sent verification email :kywilada@mailinator.com', '2019-10-15 11:16:10', 'sakshamta@test.com', 1848410030),
(713, 'Supplier has been addedxoqyqoly@mailinator.com', '2019-10-15 11:17:09', 'sakshamta@test.com', 1848410030),
(714, 'Supplier has been addedkawohaqo@mailinator.net', '2019-10-15 11:17:59', 'sakshamta@test.com', 1848410030),
(715, 'Supplier has been addedpube@mailinator.com', '2019-10-15 11:18:25', 'sakshamta@test.com', 1848410030),
(716, 'undefinedryxyreve@mailinator.net', '2019-10-15 11:18:49', 'sakshamta@test.com', 1848410030),
(717, 'undefinedryxyreve@mailinator.net', '2019-10-15 11:19:00', 'sakshamta@test.com', 1848410030),
(718, 'undefinedryxyrseve@mailinator.net', '2019-10-15 11:19:04', 'sakshamta@test.com', 1848410030),
(719, 'Failed to change password', '2019-10-15 11:23:54', 'sakshamta@test.com', 1848410030),
(720, 'Added User :basyga@mailinator.com', '2019-10-15 11:25:10', 'sakshamta@test.com', 1848410030),
(721, 'Sent verification email :basyga@mailinator.com', '2019-10-15 11:25:15', 'sakshamta@test.com', 1848410030),
(722, 'Added User :tyle@mailinator.com', '2019-10-15 11:25:47', 'sakshamta@test.com', 1848410030),
(723, 'Sent verification email :tyle@mailinator.com', '2019-10-15 11:25:51', 'sakshamta@test.com', 1848410030),
(724, 'Logged Out', '2019-10-15 11:26:38', 'sakshamta@test.com', 1848410030),
(726, 'Requested password reset', '2019-10-15 11:26:57', 'sakshamta@test.com', 1848410030),
(727, 'Reset Password', '2019-10-15 11:27:57', 'sakshamta@test.com', 1848410030),
(728, 'Reset Password', '2019-10-15 11:28:05', 'sakshamta@test.com', 1848410030),
(729, 'Requested password reset', '2019-10-15 11:28:51', 'sakshamta@test.com', 1848410030),
(730, 'Requested password reset', '2019-10-15 11:28:54', 'sakshamta@test.com', 1848410030),
(731, 'Requested password reset', '2019-10-15 11:30:19', 'sakshamta@test.com', 1848410030),
(732, 'Requested password reset', '2019-10-15 11:30:23', 'sakshamta@test.com', 1848410030),
(733, 'Failed to Log In', '2019-10-15 11:38:53', 'sakshamta@test.com', 1848410030),
(734, 'Account deactivated', '2019-10-15 11:38:56', 'sakshamta@test.com', 1848410030),
(735, 'Failed to Log In', '2019-10-15 11:39:23', 'sakshamta@test.com', 1848410030),
(736, 'Logged In', '2019-10-15 11:39:28', 'sakshamta@test.com', 1848410030),
(737, 'Viewed email templates', '2019-10-15 11:39:33', 'sakshamta@test.com', 1848410030),
(738, 'Logged In', '2019-10-16 06:21:16', 'sakshamta@test.com', 1848410030),
(739, 'Added a new sales order with id : 118 of status : draft', '2019-10-16 08:50:59', 'sakshamta@test.com', 1848410030),
(740, 'Confirmed sales order no : 118', '2019-10-16 08:51:03', 'sakshamta@test.com', 1848410030),
(741, 'Cancelled sales order no : 117', '2019-10-16 09:09:20', 'sakshamta@test.com', 1848410030),
(742, 'Added a new sales order with id : 119 of status : confirmed', '2019-10-16 09:10:06', 'sakshamta@test.com', 1848410030),
(743, 'Added a new sales order with id : 120 of status : confirmed', '2019-10-16 09:12:20', 'sakshamta@test.com', 1848410030),
(744, 'Updated sales draft no : 120', '2019-10-16 09:13:52', 'sakshamta@test.com', 1848410030),
(745, 'Viewed email templates', '2019-10-16 10:40:14', 'sakshamta@test.com', 1848410030),
(746, 'Purchase order successfully added and quantity added', '2019-10-16 10:53:46', 'sakshamta@test.com', 1848410030),
(747, 'Updated received quantity for purchase order no : 21', '2019-10-16 10:53:53', 'sakshamta@test.com', 1848410030),
(748, 'Purchase order successfully added and quantity added', '2019-10-16 10:54:07', 'sakshamta@test.com', 1848410030),
(749, 'Logged In', '2019-10-17 10:15:18', 'sakshamta@test.com', 1848410030),
(750, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:23:33', 'sakshamta@test.com', 1848410030),
(751, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:23:37', 'sakshamta@test.com', 1848410030),
(752, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:23:58', 'sakshamta@test.com', 1848410030),
(753, 'Failed to add a new sales order with status  draft', '2019-10-17 10:24:01', 'sakshamta@test.com', 1848410030),
(754, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:24:13', 'sakshamta@test.com', 1848410030),
(755, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:25:00', 'sakshamta@test.com', 1848410030),
(756, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:25:23', 'sakshamta@test.com', 1848410030),
(757, 'Failed to add a new sales order with status  draft', '2019-10-17 10:25:32', 'sakshamta@test.com', 1848410030),
(758, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:25:46', 'sakshamta@test.com', 1848410030),
(759, 'Failed to add a new sales order with status  draft', '2019-10-17 10:29:14', 'sakshamta@test.com', 1848410030),
(760, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:29:25', 'sakshamta@test.com', 1848410030),
(761, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:29:27', 'sakshamta@test.com', 1848410030),
(762, 'Failed to add a new sales order with status  draft', '2019-10-17 10:29:29', 'sakshamta@test.com', 1848410030),
(763, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:29:33', 'sakshamta@test.com', 1848410030),
(764, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:30:11', 'sakshamta@test.com', 1848410030),
(765, 'Failed to add a new sales order with status  draft', '2019-10-17 10:30:25', 'sakshamta@test.com', 1848410030),
(766, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:30:44', 'sakshamta@test.com', 1848410030),
(767, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:31:03', 'sakshamta@test.com', 1848410030),
(768, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:31:23', 'sakshamta@test.com', 1848410030),
(769, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:31:36', 'sakshamta@test.com', 1848410030),
(770, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:32:00', 'sakshamta@test.com', 1848410030),
(771, 'Failed to add a new sales order with status  confirmed', '2019-10-17 10:32:18', 'sakshamta@test.com', 1848410030),
(772, 'Added a new sales order with id : 143 of status : confirmed', '2019-10-17 10:33:26', 'sakshamta@test.com', 1848410030),
(773, 'undefinedpafavice@mailinator.com', '2019-10-17 10:43:53', 'sakshamta@test.com', 1848410030),
(774, 'undefinedpafavice@mailinator.com', '2019-10-17 10:43:55', 'sakshamta@test.com', 1848410030),
(775, 'Added a new sales order with id : 144 of status : confirmed', '2019-10-17 10:44:00', 'sakshamta@test.com', 1848410030),
(776, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:44:24', 'sakshamta@test.com', 1848410030),
(777, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:44:55', 'sakshamta@test.com', 1848410030),
(778, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:45:09', 'sakshamta@test.com', 1848410030),
(779, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:45:10', 'sakshamta@test.com', 1848410030),
(780, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:45:10', 'sakshamta@test.com', 1848410030),
(781, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:45:11', 'sakshamta@test.com', 1848410030),
(782, 'Updated delivered quantity for sales order no : 143', '2019-10-17 10:45:13', 'sakshamta@test.com', 1848410030),
(783, 'Logged In', '2019-10-20 05:57:39', 'sakshamta@test.com', 1848410030),
(784, 'undefinedziqopoqo@mailinator.com', '2019-10-20 06:02:05', 'sakshamta@test.com', 1848410030),
(785, 'undefinedziqopoqo@mailinator.com', '2019-10-20 06:02:08', 'sakshamta@test.com', 1848410030),
(786, 'Logged In', '2019-10-22 06:31:49', 'sakshamta@test.com', 1848410030),
(787, 'Logged In', '2019-10-22 06:31:49', 'sakshamta@test.com', 1848410030),
(788, 'Added a new sales order with id : 145 of status : confirmed', '2019-10-22 06:32:16', 'sakshamta@test.com', 1848410030),
(789, 'Added a new sales order with id : 146 of status : confirmed', '2019-10-22 06:39:07', 'sakshamta@test.com', 1848410030),
(790, 'Added a new sales order with id : 147 of status : confirmed', '2019-10-22 06:55:46', 'sakshamta@test.com', 1848410030),
(791, 'Added a new sales order with id : 148 of status : confirmed', '2019-10-22 07:24:13', 'sakshamta@test.com', 1848410030),
(792, 'Logged Out', '2019-10-22 07:38:42', 'sakshamta@test.com', 1848410030),
(793, 'Logged In', '2019-10-22 07:38:50', 'sakshamta@test.com', 737498677),
(794, 'Logged Out', '2019-10-22 07:43:10', 'sakshamta@test.com', 1848410030),
(795, 'Requested password reset', '2019-10-22 07:43:21', 'user@test.com', 737498677),
(796, 'Requested password reset', '2019-10-22 07:43:22', 'user@test.com', 737498677),
(797, 'Reset Password', '2019-10-22 07:43:41', 'user@test.com', 737498677),
(798, 'Failed to Log In', '2019-10-22 07:43:57', 'user@test.com', 737498677),
(799, 'Logged In', '2019-10-22 07:44:00', 'user@test.com', 737498677),
(800, 'Checked In', '2019-10-22 07:44:02', 'user@test.com', 737498677),
(801, 'checked Out', '2019-10-22 07:44:54', 'user@test.com', 737498677),
(802, 'Logged In', '2019-10-22 07:45:03', 'sakshamta@test.com', 737498677),
(803, 'Added User :wyqapiv@mailinator.com', '2019-10-22 07:45:10', 'sakshamta@test.com', 737498677),
(804, 'Sent verification email :wyqapiv@mailinator.com', '2019-10-22 07:45:14', 'sakshamta@test.com', 737498677),
(805, 'Added a new sales order with id : 149 of status : confirmed', '2019-10-22 07:48:29', 'sakshamta@test.com', 737498677),
(806, 'Added User :tovotadame@mailinator.net', '2019-10-22 07:52:44', 'sakshamta@test.com', 737498677),
(807, 'Sent verification email :tovotadame@mailinator.net', '2019-10-22 07:52:47', 'sakshamta@test.com', 737498677),
(808, 'Activated Account', '2019-10-22 07:58:37', 'wyqapiv@mailinator.com', 737498677),
(809, 'Added User :zejeziqyf@mailinator.com', '2019-10-22 07:59:29', 'sakshamta@test.com', 737498677),
(810, 'Sent verification email :zejeziqyf@mailinator.com', '2019-10-22 07:59:33', 'sakshamta@test.com', 737498677),
(811, 'Added User :lerurico@mailinator.net', '2019-10-22 08:01:05', 'sakshamta@test.com', 737498677),
(812, 'Failed to Added User :lerurico@mailinator.net', '2019-10-22 08:01:08', 'sakshamta@test.com', 737498677),
(813, 'Sent verification email :lerurico@mailinator.net', '2019-10-22 08:01:08', 'sakshamta@test.com', 737498677),
(814, 'Added User :lerlurico@mailinator.net', '2019-10-22 08:01:20', 'sakshamta@test.com', 737498677),
(815, 'Sent verification email :lerlurico@mailinator.net', '2019-10-22 08:01:23', 'sakshamta@test.com', 737498677),
(816, 'Added User :rygu@mailinator.net', '2019-10-22 08:06:03', 'sakshamta@test.com', 737498677),
(817, 'Sent verification email :rygu@mailinator.net', '2019-10-22 08:06:07', 'sakshamta@test.com', 737498677),
(818, 'Supplier has been addedkava@mailinator.com', '2019-10-22 08:18:39', 'sakshamta@test.com', 737498677),
(819, 'Purchase order successfully added and quantity added', '2019-10-22 08:18:53', 'sakshamta@test.com', 737498677),
(820, 'Purchase order successfully added and quantity added', '2019-10-22 08:18:54', 'sakshamta@test.com', 737498677),
(821, 'updated draft purchase order to issued 24', '2019-10-22 08:19:02', 'sakshamta@test.com', 737498677),
(822, 'Updated received quantity for purchase order no : 19', '2019-10-22 08:19:15', 'sakshamta@test.com', 737498677),
(823, 'Updated received quantity for purchase order no : 19', '2019-10-22 08:19:15', 'sakshamta@test.com', 737498677),
(824, 'Updated received quantity for purchase order no : 19', '2019-10-22 08:19:15', 'sakshamta@test.com', 737498677),
(825, 'Supplier has been addeddewynoq@mailinator.com', '2019-10-22 08:51:15', 'sakshamta@test.com', 1728715946),
(826, 'Purchase order successfully added and quantity added', '2019-10-22 08:51:32', 'sakshamta@test.com', 1728715946),
(827, 'Updated status to \"fulfilled\" for  sales order no : 143', '2019-10-22 08:56:35', 'sakshamta@test.com', 1728715946),
(828, 'Updated delivered quantity for sales order no : 146', '2019-10-22 08:57:09', 'sakshamta@test.com', 1728715946),
(829, 'Updated delivered quantity for sales order no : 147', '2019-10-22 08:57:44', 'sakshamta@test.com', 1728715946),
(830, 'updated draft purchase order to issued 29', '2019-10-22 09:07:04', 'sakshamta@test.com', 1728715946),
(831, 'Purchase order successfully added and quantity added', '2019-10-22 09:07:28', 'sakshamta@test.com', 1728715946),
(832, 'Purchase order successfully added and quantity added', '2019-10-22 09:07:28', 'sakshamta@test.com', 1728715946),
(833, 'Updated Purchase draft no : 31', '2019-10-22 09:36:08', 'sakshamta@test.com', 1728715946),
(834, 'Updated Purchase draft no : 31', '2019-10-22 09:36:33', 'sakshamta@test.com', 1728715946),
(835, 'Updated Purchase draft no : 31', '2019-10-22 10:17:56', 'sakshamta@test.com', 1728715946),
(836, 'Added a new sales order with id : 150 of status : draft', '2019-10-22 10:18:40', 'sakshamta@test.com', 1728715946),
(837, 'Updated sales draft no : 150', '2019-10-22 10:18:55', 'sakshamta@test.com', 1728715946),
(838, 'Updated sales draft no : 150', '2019-10-22 10:19:19', 'sakshamta@test.com', 1728715946),
(839, 'Updated sales draft no : 150', '2019-10-22 10:19:45', 'sakshamta@test.com', 1728715946),
(842, 'Requested password reset', '2019-11-03 07:19:17', 'sakshamta@test.com', 3392359630),
(843, 'Reset Password', '2019-11-03 07:21:44', 'sakshamta@test.com', 3392359630),
(844, 'Logged In', '2019-11-03 07:21:59', 'sakshamta@test.com', 3392359630),
(845, 'updated draft purchase order to issued 30', '2019-11-03 07:22:20', 'sakshamta@test.com', 3392359630),
(846, 'Updated received quantity for purchase order no : 30', '2019-11-03 07:22:36', 'sakshamta@test.com', 3392359630),
(847, 'Updated received quantity for purchase order no : 30', '2019-11-03 07:22:36', 'sakshamta@test.com', 3392359630),
(848, 'Updated received quantity for purchase order no : 30', '2019-11-03 07:22:36', 'sakshamta@test.com', 3392359630),
(849, 'Logged In', '2019-11-06 08:37:25', 'sakshamta@test.com', 3392359630),
(850, 'Logged In', '2019-11-10 10:06:18', 'sakshamta@test.com', 3392359630),
(851, 'Added User :qibo@mailinator.com', '2019-11-10 10:58:37', 'sakshamta@test.com', 3392359630),
(852, 'Sent verification email :qibo@mailinator.com', '2019-11-10 10:58:40', 'sakshamta@test.com', 3392359630),
(853, 'Logged In', '2019-11-11 06:47:04', 'sakshamta@test.com', 3392359630),
(854, 'Successfully added the new Category', '2019-11-11 07:02:52', 'sakshamta@test.com', 3392359630),
(855, 'Updated Category Successfully', '2019-11-11 07:03:31', 'sakshamta@test.com', 3392359630),
(856, 'Requested password reset', '2019-11-12 06:15:53', 'sakshamta@test.com', 3392359630),
(857, 'Reset Password', '2019-11-12 06:16:38', 'sakshamta@test.com', 3392359630),
(858, 'Logged In', '2019-11-12 06:16:52', 'sakshamta@test.com', 3392359630),
(859, 'Viewed email templates', '2019-11-12 06:17:14', 'sakshamta@test.com', 3392359630),
(860, 'Succesfully updated permissions for user : super@test.com', '2019-11-12 06:18:00', 'sakshamta@test.com', 3392359630),
(861, 'Viewed email templates', '2019-11-12 06:18:47', 'sakshamta@test.com', 3392359630),
(862, 'Succesfully updated permissions for user : super@test.com', '2019-11-12 06:23:12', 'sakshamta@test.com', 3392359630),
(863, 'Succesfully updated permissions for user : super@test.com', '2019-11-12 06:23:52', 'sakshamta@test.com', 3392359630),
(864, 'Updated : user@test.com', '2019-11-12 06:25:52', 'sakshamta@test.com', 3392359630),
(865, 'Logged Out', '2019-11-12 06:26:10', 'sakshamta@test.com', 3392359630),
(866, 'Failed to Log In', '2019-11-12 06:26:17', 'user@test.com', 3392359626),
(867, 'Requested password reset', '2019-11-12 06:26:26', 'user@test.com', 3392359626),
(868, 'Reset Password', '2019-11-12 06:28:41', 'user@test.com', 3392359626),
(869, 'Logged In', '2019-11-12 06:29:08', 'user@test.com', 3392359626),
(870, 'Checked In', '2019-11-12 06:29:24', 'user@test.com', 3392359626),
(871, 'checked Out', '2019-11-12 06:30:34', 'user@test.com', 3392359626),
(872, 'Logged Out', '2019-11-12 06:31:06', 'user@test.com', 3392359626),
(873, 'Logged In', '2019-11-12 06:34:44', 'sakshamta@test.com', 3392359626),
(874, 'Successfully added the new Category', '2019-11-12 06:35:22', 'sakshamta@test.com', 3392359626),
(875, 'Logged Out', '2019-11-12 07:15:31', 'sakshamta@test.com', 3392359626),
(876, 'Logged In', '2019-11-12 07:15:38', 'sakshamta@test.com', 3392359626),
(878, 'Logged Out', '2019-11-12 07:16:35', 'sakshamta@test.com', 3392359626),
(879, 'Logged In', '2019-11-12 07:17:05', 'sakshamta@test.com', 3392359626),
(880, 'Duplicate Category item tried to be added', '2019-11-12 07:17:17', 'sakshamta@test.com', 3392359626),
(881, 'Successfully added the new Category', '2019-11-12 07:17:35', 'sakshamta@test.com', 3392359626),
(882, 'Successfully added the new Category', '2019-11-12 07:18:22', 'sakshamta@test.com', 3392359626),
(883, 'Duplicate Category item tried to be added', '2019-11-12 08:31:04', 'sakshamta@test.com', 3392359626),
(884, 'Successfully added the new Category', '2019-11-12 08:31:08', 'sakshamta@test.com', 3392359626),
(885, 'Duplicate Category item tried to be added', '2019-11-12 08:31:53', 'sakshamta@test.com', 3392359626),
(886, 'Updated Category Successfully', '2019-11-12 08:31:58', 'sakshamta@test.com', 3392359626),
(887, 'Successfully added the new Category', '2019-11-12 11:35:23', 'sakshamta@test.com', 3392359626),
(888, 'Logged In', '2019-11-13 06:48:19', 'sakshamta@test.com', 3392359626),
(889, 'Succesfully updated permissions for user : sakshamta@test.com', '2019-11-13 06:48:48', 'sakshamta@test.com', 3392359626),
(890, 'Succesfully updated permissions for user : sakshamta@test.com', '2019-11-13 06:49:03', 'sakshamta@test.com', 3392359626),
(891, 'Succesfully updated permissions for user : admin@test.com', '2019-11-13 06:49:49', 'sakshamta@test.com', 3392359626),
(892, 'Succesfully updated permissions for user : admin@test.com', '2019-11-13 06:56:58', 'sakshamta@test.com', 3392359626),
(893, 'Succesfully updated permissions for user : sakshamta@test.com', '2019-11-13 07:14:09', 'sakshamta@test.com', 3392359626),
(894, 'Succesfully updated permissions for user : admin@test.com', '2019-11-13 07:23:01', 'sakshamta@test.com', 3392359626),
(895, 'Succesfully updated permissions for user : sakshamta@test.com', '2019-11-13 08:07:03', 'sakshamta@test.com', 3392359626),
(896, 'Succesfully updated permissions for user : sakshamta@test.com', '2019-11-13 08:07:12', 'sakshamta@test.com', 3392359626),
(897, 'Logged In', '2019-11-14 07:07:30', 'sakshamta@test.com', 3392359626),
(898, 'Logged Out', '2019-11-14 10:13:42', 'sakshamta@test.com', 3392359626),
(899, 'Logged In', '2019-11-14 10:14:02', 'sakshamta@test.com', 1728716634),
(900, 'Logged In', '2019-11-14 10:45:57', 'sakshamta@test.com', 1728716634);

-- --------------------------------------------------------

--
-- Table structure for table `apps_countries`
--

CREATE TABLE `apps_countries` (
  `id` int(11) NOT NULL,
  `country_code` varchar(2) NOT NULL DEFAULT '',
  `country_name` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apps_countries`
--

INSERT INTO `apps_countries` (`id`, `country_code`, `country_name`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CG', 'Congo'),
(50, 'CK', 'Cook Islands'),
(51, 'CR', 'Costa Rica'),
(52, 'HR', 'Croatia (Hrvatska)'),
(53, 'CU', 'Cuba'),
(54, 'CY', 'Cyprus'),
(55, 'CZ', 'Czech Republic'),
(56, 'DK', 'Denmark'),
(57, 'DJ', 'Djibouti'),
(58, 'DM', 'Dominica'),
(59, 'DO', 'Dominican Republic'),
(60, 'TP', 'East Timor'),
(61, 'EC', 'Ecuador'),
(62, 'EG', 'Egypt'),
(63, 'SV', 'El Salvador'),
(64, 'GQ', 'Equatorial Guinea'),
(65, 'ER', 'Eritrea'),
(66, 'EE', 'Estonia'),
(67, 'ET', 'Ethiopia'),
(68, 'FK', 'Falkland Islands (Malvinas)'),
(69, 'FO', 'Faroe Islands'),
(70, 'FJ', 'Fiji'),
(71, 'FI', 'Finland'),
(72, 'FR', 'France'),
(73, 'FX', 'France, Metropolitan'),
(74, 'GF', 'French Guiana'),
(75, 'PF', 'French Polynesia'),
(76, 'TF', 'French Southern Territories'),
(77, 'GA', 'Gabon'),
(78, 'GM', 'Gambia'),
(79, 'GE', 'Georgia'),
(80, 'DE', 'Germany'),
(81, 'GH', 'Ghana'),
(82, 'GI', 'Gibraltar'),
(83, 'GK', 'Guernsey'),
(84, 'GR', 'Greece'),
(85, 'GL', 'Greenland'),
(86, 'GD', 'Grenada'),
(87, 'GP', 'Guadeloupe'),
(88, 'GU', 'Guam'),
(89, 'GT', 'Guatemala'),
(90, 'GN', 'Guinea'),
(91, 'GW', 'Guinea-Bissau'),
(92, 'GY', 'Guyana'),
(93, 'HT', 'Haiti'),
(94, 'HM', 'Heard and Mc Donald Islands'),
(95, 'HN', 'Honduras'),
(96, 'HK', 'Hong Kong'),
(97, 'HU', 'Hungary'),
(98, 'IS', 'Iceland'),
(99, 'IN', 'India'),
(100, 'IM', 'Isle of Man'),
(101, 'ID', 'Indonesia'),
(102, 'IR', 'Iran (Islamic Republic of)'),
(103, 'IQ', 'Iraq'),
(104, 'IE', 'Ireland'),
(105, 'IL', 'Israel'),
(106, 'IT', 'Italy'),
(107, 'CI', 'Ivory Coast'),
(108, 'JE', 'Jersey'),
(109, 'JM', 'Jamaica'),
(110, 'JP', 'Japan'),
(111, 'JO', 'Jordan'),
(112, 'KZ', 'Kazakhstan'),
(113, 'KE', 'Kenya'),
(114, 'KI', 'Kiribati'),
(115, 'KP', 'Korea, Democratic People\'s Republic of'),
(116, 'KR', 'Korea, Republic of'),
(117, 'XK', 'Kosovo'),
(118, 'KW', 'Kuwait'),
(119, 'KG', 'Kyrgyzstan'),
(120, 'LA', 'Lao People\'s Democratic Republic'),
(121, 'LV', 'Latvia'),
(122, 'LB', 'Lebanon'),
(123, 'LS', 'Lesotho'),
(124, 'LR', 'Liberia'),
(125, 'LY', 'Libyan Arab Jamahiriya'),
(126, 'LI', 'Liechtenstein'),
(127, 'LT', 'Lithuania'),
(128, 'LU', 'Luxembourg'),
(129, 'MO', 'Macau'),
(130, 'MK', 'Macedonia'),
(131, 'MG', 'Madagascar'),
(132, 'MW', 'Malawi'),
(133, 'MY', 'Malaysia'),
(134, 'MV', 'Maldives'),
(135, 'ML', 'Mali'),
(136, 'MT', 'Malta'),
(137, 'MH', 'Marshall Islands'),
(138, 'MQ', 'Martinique'),
(139, 'MR', 'Mauritania'),
(140, 'MU', 'Mauritius'),
(141, 'TY', 'Mayotte'),
(142, 'MX', 'Mexico'),
(143, 'FM', 'Micronesia, Federated States of'),
(144, 'MD', 'Moldova, Republic of'),
(145, 'MC', 'Monaco'),
(146, 'MN', 'Mongolia'),
(147, 'ME', 'Montenegro'),
(148, 'MS', 'Montserrat'),
(149, 'MA', 'Morocco'),
(150, 'MZ', 'Mozambique'),
(151, 'MM', 'Myanmar'),
(152, 'NA', 'Namibia'),
(153, 'NR', 'Nauru'),
(154, 'NP', 'Nepal'),
(155, 'NL', 'Netherlands'),
(156, 'AN', 'Netherlands Antilles'),
(157, 'NC', 'New Caledonia'),
(158, 'NZ', 'New Zealand'),
(159, 'NI', 'Nicaragua'),
(160, 'NE', 'Niger'),
(161, 'NG', 'Nigeria'),
(162, 'NU', 'Niue'),
(163, 'NF', 'Norfolk Island'),
(164, 'MP', 'Northern Mariana Islands'),
(165, 'NO', 'Norway'),
(166, 'OM', 'Oman'),
(167, 'PK', 'Pakistan'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestine'),
(170, 'PA', 'Panama'),
(171, 'PG', 'Papua New Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Peru'),
(174, 'PH', 'Philippines'),
(175, 'PN', 'Pitcairn'),
(176, 'PL', 'Poland'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'RE', 'Reunion'),
(181, 'RO', 'Romania'),
(182, 'RU', 'Russian Federation'),
(183, 'RW', 'Rwanda'),
(184, 'KN', 'Saint Kitts and Nevis'),
(185, 'LC', 'Saint Lucia'),
(186, 'VC', 'Saint Vincent and the Grenadines'),
(187, 'WS', 'Samoa'),
(188, 'SM', 'San Marino'),
(189, 'ST', 'Sao Tome and Principe'),
(190, 'SA', 'Saudi Arabia'),
(191, 'SN', 'Senegal'),
(192, 'RS', 'Serbia'),
(193, 'SC', 'Seychelles'),
(194, 'SL', 'Sierra Leone'),
(195, 'SG', 'Singapore'),
(196, 'SK', 'Slovakia'),
(197, 'SI', 'Slovenia'),
(198, 'SB', 'Solomon Islands'),
(199, 'SO', 'Somalia'),
(200, 'ZA', 'South Africa'),
(201, 'GS', 'South Georgia South Sandwich Islands'),
(202, 'SS', 'South Sudan'),
(203, 'ES', 'Spain'),
(204, 'LK', 'Sri Lanka'),
(205, 'SH', 'St. Helena'),
(206, 'PM', 'St. Pierre and Miquelon'),
(207, 'SD', 'Sudan'),
(208, 'SR', 'Suriname'),
(209, 'SJ', 'Svalbard and Jan Mayen Islands'),
(210, 'SZ', 'Swaziland'),
(211, 'SE', 'Sweden'),
(212, 'CH', 'Switzerland'),
(213, 'SY', 'Syrian Arab Republic'),
(214, 'TW', 'Taiwan'),
(215, 'TJ', 'Tajikistan'),
(216, 'TZ', 'Tanzania, United Republic of'),
(217, 'TH', 'Thailand'),
(218, 'TG', 'Togo'),
(219, 'TK', 'Tokelau'),
(220, 'TO', 'Tonga'),
(221, 'TT', 'Trinidad and Tobago'),
(222, 'TN', 'Tunisia'),
(223, 'TR', 'Turkey'),
(224, 'TM', 'Turkmenistan'),
(225, 'TC', 'Turks and Caicos Islands'),
(226, 'TV', 'Tuvalu'),
(227, 'UG', 'Uganda'),
(228, 'UA', 'Ukraine'),
(229, 'AE', 'United Arab Emirates'),
(230, 'GB', 'United Kingdom'),
(231, 'US', 'United States'),
(232, 'UM', 'United States minor outlying islands'),
(233, 'UY', 'Uruguay'),
(234, 'UZ', 'Uzbekistan'),
(235, 'VU', 'Vanuatu'),
(236, 'VA', 'Vatican City State'),
(237, 'VE', 'Venezuela'),
(238, 'VN', 'Vietnam'),
(239, 'VG', 'Virgin Islands (British)'),
(240, 'VI', 'Virgin Islands (U.S.)'),
(241, 'WF', 'Wallis and Futuna Islands'),
(242, 'EH', 'Western Sahara'),
(243, 'YE', 'Yemen'),
(244, 'ZR', 'Zaire'),
(245, 'ZM', 'Zambia'),
(246, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `c_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('show','hide') NOT NULL DEFAULT 'show',
  `pass_mark` int(11) NOT NULL,
  `full_mark` int(11) NOT NULL,
  `added_by` varchar(255) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_by` varchar(255) DEFAULT NULL,
  `parent_id` int(11) UNSIGNED ZEROFILL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `c_name`, `slug`, `status`, `pass_mark`, `full_mark`, `added_by`, `added_date`, `updated_date`, `updated_by`, `parent_id`) VALUES
(62, 'Mathamatics', 'mathamatics', 'show', 0, 0, 'Saurav Adhikari', '2019-11-11 07:03:31', '2019-11-11 07:03:31', 'Saurav Adhikari', NULL),
(63, 'scinence', 'scinence', 'show', 0, 0, 'Saurav Adhikari', '2019-11-12 06:35:22', '0000-00-00 00:00:00', NULL, NULL),
(65, 'English', 'english', 'show', 0, 0, 'Saurav Adhikari', '2019-11-11 19:17:35', '0000-00-00 00:00:00', NULL, NULL),
(66, 'Mathss', 'mathss', 'show', 0, 0, 'Saurav Adhikari', '2019-11-11 19:18:22', '0000-00-00 00:00:00', NULL, NULL),
(68, 'Mathssss', 'mathssss', 'show', 0, 0, 'sakshamta@test.com', '2019-11-12 08:31:57', '2019-11-11 20:31:57', 'sakshamta@test.com', NULL),
(69, 'Mathsddd', 'mathsddd', 'hide', 2, 12, 'sakshamta@test.com', '2019-11-11 23:35:23', '0000-00-00 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `checklog`
--

CREATE TABLE `checklog` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `checkin` datetime DEFAULT CURRENT_TIMESTAMP,
  `checkout` datetime DEFAULT NULL,
  `late_reason` varchar(100) DEFAULT NULL,
  `early_reason` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checklog`
--

INSERT INTO `checklog` (`id`, `userid`, `checkin`, `checkout`, `late_reason`, `early_reason`) VALUES
(7, 200, '2019-10-15 16:45:40', '2019-10-15 16:45:45', 's', 's'),
(8, 200, '2019-10-22 13:29:02', '2019-10-22 13:29:54', 'y', 's'),
(9, 200, '2019-11-12 12:14:24', '2019-11-12 12:15:34', 'ifajlfj', 'Not Early');

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int(11) NOT NULL,
  `template_name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `body` text NOT NULL,
  `hook` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `template_name`, `title`, `body`, `hook`) VALUES
(1, 'Email Verification', 'Email Verification Notice', '<p>&nbsp;</p>\n<table class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">&nbsp;</td>\n<td class=\"container\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;\">\n<div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;\"><!-- START CENTERED WHITE CONTAINER -->\n<table class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;\"><!-- START MAIN CONTENT AREA -->\n<tbody>\n<tr>\n<td class=\"wrapper\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">Hi there,</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">We\'re excited to have you get started. First ,you need to confirm your account.Just press the button below</p>\n<table class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;\" align=\"center\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;\"><a style=\"display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;\" href=\"[EMAIL_LINK]\" target=\"_blank\" rel=\"noopener\">Verify Account</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If that doesn\'t work, copy and paste the following link in your browser:</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">[EMAIL_LINK]</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If you have any questions,just reply to this email-we\'re always happy to help out.</p>\n<p>Cheers,<br />[SITE_NAME] Team</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<!-- END MAIN CONTENT AREA --></tbody>\n</table>\n<!-- START FOOTER -->\n<div class=\"footer\" style=\"clear: both; margin-top: 10px; text-align: center; width: 100%;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td class=\"content-block\" style=\"font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;\"><span class=\"apple-link\" style=\"color: #999999; font-size: 12px; text-align: center;\">[SITE_NAME]</span></td>\n</tr>\n</tbody>\n</table>\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>', 'email_verification'),
(2, 'Password Reset', 'Password Reset Request', '<p>&nbsp;</p>\n<p>&nbsp;</p>\n<table class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">&nbsp;</td>\n<td class=\"container\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;\">\n<div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;\"><!-- START CENTERED WHITE CONTAINER -->\n<table class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;\"><!-- START MAIN CONTENT AREA -->\n<tbody>\n<tr>\n<td class=\"wrapper\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">\n<h1 style=\"font-family: sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; text-align: center;\">Trouble signing in?</h1>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">Resetting your password is easy. Just press the button below and follow the instructions. We\'ll have you up and running in no time.</p>\n<table class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;\" align=\"center\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px;\"><a style=\"display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;\" href=\"[EMAIL_LINK]\" target=\"_blank\" rel=\"noopener\">Reset Password</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If that doesn\'t work, copy and paste the following link in your browser:</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">[EMAIL_LINK]</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If you have any questions, just reply to this email-we\'re always happy to help out.</p>\n<p>Cheers,<br />[SITE_NAME] Team</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<!-- END MAIN CONTENT AREA --></tbody>\n</table>\n<!-- START FOOTER -->\n<div class=\"footer\" style=\"clear: both; margin-top: 10px; text-align: center; width: 100%;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td class=\"content-block\" style=\"font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;\"><span class=\"apple-link\" style=\"color: #999999; font-size: 12px; text-align: center;\">[SITE_NAME]</span></td>\n</tr>\n</tbody>\n</table>\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>\n<p></p>', 'password_reset'),
(3, 'Account deactivated', 'Account Deactivated', '<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <meta name=\"viewport\" content=\"width=device-width\" />\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\r\n    <title>Account deactivated</title>\r\n    <style>\r\n      /* -------------------------------------\r\n        INLINED WITH htmlemail.io/inline\r\n    ------------------------------------- */\r\n      /* -------------------------------------\r\n        RESPONSIVE AND MOBILE FRIENDLY STYLES\r\n    ------------------------------------- */\r\n      @media only screen and (max-width: 620px) {\r\n        table[class=\"body\"] h1 {\r\n          font-size: 28px !important;\r\n          margin-bottom: 10px !important;\r\n        }\r\n        table[class=\"body\"] p,\r\n        table[class=\"body\"] ul,\r\n        table[class=\"body\"] ol,\r\n        table[class=\"body\"] td,\r\n        table[class=\"body\"] span,\r\n        table[class=\"body\"] a {\r\n          font-size: 16px !important;\r\n        }\r\n        table[class=\"body\"] .wrapper,\r\n        table[class=\"body\"] .article {\r\n          padding: 10px !important;\r\n        }\r\n        table[class=\"body\"] .content {\r\n          padding: 0 !important;\r\n        }\r\n        table[class=\"body\"] .container {\r\n          padding: 0 !important;\r\n          width: 100% !important;\r\n        }\r\n        table[class=\"body\"] .main {\r\n          border-left-width: 0 !important;\r\n          border-radius: 0 !important;\r\n          border-right-width: 0 !important;\r\n        }\r\n        table[class=\"body\"] .btn table {\r\n          width: 100% !important;\r\n        }\r\n        table[class=\"body\"] .btn a {\r\n          width: 100% !important;\r\n        }\r\n        table[class=\"body\"] .img-responsive {\r\n          height: auto !important;\r\n          max-width: 100% !important;\r\n          width: auto !important;\r\n        }\r\n      }\r\n      /* -------------------------------------\r\n        PRESERVE THESE STYLES IN THE HEAD\r\n    ------------------------------------- */\r\n      @media all {\r\n        .ExternalClass {\r\n          width: 100%;\r\n        }\r\n        .ExternalClass,\r\n        .ExternalClass p,\r\n        .ExternalClass span,\r\n        .ExternalClass font,\r\n        .ExternalClass td,\r\n        .ExternalClass div {\r\n          line-height: 100%;\r\n        }\r\n        .apple-link a {\r\n          color: inherit !important;\r\n          font-family: inherit !important;\r\n          font-size: inherit !important;\r\n          font-weight: inherit !important;\r\n          line-height: inherit !important;\r\n          text-decoration: none !important;\r\n        }\r\n        #MessageViewBody a {\r\n          color: inherit;\r\n          text-decoration: none;\r\n          font-size: inherit;\r\n          font-family: inherit;\r\n          font-weight: inherit;\r\n          line-height: inherit;\r\n        }\r\n        .btn-primary table td:hover {\r\n          background-color: #34495e !important;\r\n        }\r\n        .btn-primary a:hover {\r\n          background-color: #34495e !important;\r\n          border-color: #34495e !important;\r\n        }\r\n      }\r\n    </style>\r\n  </head>\r\n  <body\r\n    class=\"\"\r\n    style=\"background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\"\r\n  >\r\n    <table\r\n      border=\"0\"\r\n      cellpadding=\"0\"\r\n      cellspacing=\"0\"\r\n      class=\"body\"\r\n      style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;\"\r\n    >\r\n      <tr>\r\n        <td\r\n          style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\"\r\n        >\r\n          &nbsp;\r\n        </td>\r\n        <td\r\n          class=\"container\"\r\n          style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;\"\r\n        >\r\n          <div\r\n            class=\"content\"\r\n            style=\"box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;\"\r\n          >\r\n            <!-- START CENTERED WHITE CONTAINER -->\r\n            <table\r\n              class=\"main\"\r\n              style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;\"\r\n            >\r\n              <!-- START MAIN CONTENT AREA -->\r\n              <tr>\r\n                <td\r\n                  class=\"wrapper\"\r\n                  style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;\"\r\n                >\r\n                  <table\r\n                    border=\"0\"\r\n                    cellpadding=\"0\"\r\n                    cellspacing=\"0\"\r\n                    style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\"\r\n                  >\r\n                    <tr>\r\n                      <td\r\n                        style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\"\r\n                      >\r\n                        <h1\r\n                          style=\"font-family: sans-serif;  font-weight: normal; margin: 0; Margin-bottom: 15px;text-align: center\"\r\n                        >\r\n                       Account Closed\r\n                    </h1>\r\n                        <p\r\n                          style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;\"\r\n                        >\r\n                        \r\n                       Your account has been closed because of too many failed login attempts.\r\n					   <br/>\r\n					   \r\nYou will not be able to access the system anymore.\r\n                        </p>             \r\n                        <p\r\n                          style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;\"\r\n                        >\r\n                        If it was not you please contact us at [SITE_EMAIL]. \r\n                        </p>\r\n                        <p>\r\n                          Sincerely,<br />\r\n                          [SITE_NAME] Team\r\n                        </p>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n              <!-- END MAIN CONTENT AREA -->\r\n            </table>\r\n\r\n            <!-- START FOOTER -->\r\n            <div\r\n              class=\"footer\"\r\n              style=\"clear: both; Margin-top: 10px; text-align: center; width: 100%;\"\r\n            >\r\n              <table\r\n                border=\"0\"\r\n                cellpadding=\"0\"\r\n                cellspacing=\"0\"\r\n                style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\"\r\n              >\r\n                <tr>\r\n                  <td\r\n                    class=\"content-block\"\r\n                    style=\"font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;\"\r\n                  >\r\n                    <span\r\n                      class=\"apple-link\"\r\n                      style=\"color: #999999; font-size: 12px; text-align: center;\"\r\n                      >[SITE_NAME]</span\r\n                    >\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>\r\n', 'account_deactivated'),
(4, 'Email Update', 'Email Update', '<p>&nbsp;</p>\n<p>&nbsp;</p>\n<table class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">&nbsp;</td>\n<td class=\"container\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;\">\n<div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;\"><!-- START CENTERED WHITE CONTAINER -->\n<table class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;\"><!-- START MAIN CONTENT AREA -->\n<tbody>\n<tr>\n<td class=\"wrapper\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top;\">\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">Hi there,</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">We\'re recently received a request to update email. If this was you.Just press the button below.</p>\n<table class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;\" align=\"center\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;\"><a style=\"display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;\" href=\"EMAIL_LINK\" target=\"_blank\" rel=\"noopener\">Update Email</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If that doesn\'t work, copy and paste the following link in your browser:</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">EMAIL_LINK</p>\n<p style=\"font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;\">If you have any questions,just reply to this email-we\'re always happy to help out.</p>\n<p>Cheers,<br />SITE_NAME Team</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<!-- END MAIN CONTENT AREA --></tbody>\n</table>\n<!-- START FOOTER -->\n<div class=\"footer\" style=\"clear: both; margin-top: 10px; text-align: center; width: 100%;\">\n<table style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td class=\"content-block\" style=\"font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;\"><span class=\"apple-link\" style=\"color: #999999; font-size: 12px; text-align: center;\">SITE_NAME</span></td>\n</tr>\n</tbody>\n</table>\n</div>\n</div>\n</td>\n</tr>\n</tbody>\n</table>', 'update_email');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_adjustment`
--

CREATE TABLE `inventory_adjustment` (
  `id` int(11) NOT NULL,
  `adjustment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `reason` enum('Purchase return','Sales Return','Loss by fire','Theft') DEFAULT NULL,
  `description` text,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `adjustment_type` enum('Quantity','Value') DEFAULT NULL,
  `adjusted_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_attempt`
--

CREATE TABLE `login_attempt` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ip` int(4) UNSIGNED NOT NULL,
  `attempt_date` date DEFAULT NULL,
  `attempt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_attempt`
--

INSERT INTO `login_attempt` (`id`, `email`, `ip`, `attempt_date`, `attempt`) VALUES
(16, 'sakshamta@test.com', 1848410030, '2019-10-15', 1),
(17, 'user@test.com', 737498677, '2019-10-22', 1),
(18, 'user@test.com', 3392359626, '2019-11-12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `module_name` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `module_name`, `parent_id`, `slug`) VALUES
(11, 'Categories', 0, 'categories'),
(12, 'Add Categories', 11, 'add-categories'),
(13, 'Manage Categories', 11, 'manage-categories'),
(17, 'Manage Members', 0, 'manage-members'),
(18, 'Add user', 17, 'add-user'),
(19, 'Edit user', 17, 'edit-user'),
(20, 'Manage Permissions', 0, 'manage-permissions'),
(21, 'Settings', 0, 'settings'),
(22, 'Email Templates', 21, 'email-templates'),
(23, 'User Logs', 21, 'user-logs'),
(24, 'Absent Report', 0, 'absent'),
(25, 'Quiz', 0, 'quiz'),
(26, 'Add Quiz Question', 25, 'add-quiz-question');

-- --------------------------------------------------------

--
-- Table structure for table `module_permission`
--

CREATE TABLE `module_permission` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `module_permission`
--

INSERT INTO `module_permission` (`id`, `user_id`, `module_id`) VALUES
(486, 2, 11),
(487, 2, 12),
(488, 2, 13),
(489, 2, 17),
(490, 2, 18),
(491, 2, 19),
(492, 2, 20),
(493, 2, 21),
(494, 2, 22),
(495, 2, 23),
(496, 2, 24),
(497, 2, 25),
(498, 2, 26),
(510, 1, 11),
(511, 1, 12),
(512, 1, 13),
(513, 1, 17),
(514, 1, 18),
(515, 1, 19),
(516, 1, 20),
(517, 1, 21),
(518, 1, 22),
(519, 1, 23),
(520, 1, 24),
(521, 1, 25),
(522, 1, 26);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) UNSIGNED NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT 'uncatogorized',
  `cost_price` float UNSIGNED NOT NULL,
  `measurement_unit` enum('piece','feet','kg','litre') NOT NULL DEFAULT 'piece',
  `quantity` int(11) NOT NULL,
  `manufacture_date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `reorder_level` int(11) DEFAULT NULL,
  `reorder_quantity` int(11) DEFAULT NULL,
  `market_price` float NOT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('yes','No') DEFAULT 'yes',
  `added_by` varchar(255) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `update_by` varchar(255) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `stock_keeping_unit` varchar(255) DEFAULT NULL,
  `max_discount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `p_name`, `category`, `cost_price`, `measurement_unit`, `quantity`, `manufacture_date`, `expire_date`, `reorder_level`, `reorder_quantity`, `market_price`, `brand_name`, `description`, `status`, `added_by`, `added_date`, `update_by`, `update_date`, `stock_keeping_unit`, `max_discount`) VALUES
(8, 'Name', 'Uncatogorized', 22, 'feet', 2147483647, '0000-00-00', '0000-00-00', 6, 0, 2, 'Brand', 'Description 13', 'No', 'Super Admin', '2019-10-16 09:13:25', 'Saurav Admin', '2019-10-14 22:34:57', NULL, 1),
(9, 'Marny Mcleod', 'Jeans', 830, '', 2147483647, '1979-03-10', NULL, 1, 873, 782, 'Brenna Rutledge', '', '', 'Saurav Admin', '2019-10-16 09:13:25', NULL, NULL, NULL, 0),
(10, 'Allen Mccall', 't shirt 2', 266, '', 2147483571, '1990-12-16', NULL, 8, 731, 962, 'Carlos Odonnell', '', '', 'Saurav Admin', '2019-10-22 07:24:13', NULL, NULL, NULL, 0),
(11, 'Raphael Ellison', 'Jade', 441, '', 2147483097, '1976-01-16', NULL, 70, 853, 588, 'Eric Pope', '', '', 'Saurav Admin', '2019-10-22 06:32:16', NULL, NULL, NULL, 0),
(12, 'Amery Meadows', 'Saurav', 848, '', 2147482892, '1972-06-16', NULL, 57, 885, 158, 'Tucker Shepherd', '', '', 'Saurav Admin', '2019-10-22 06:39:07', NULL, NULL, NULL, 0),
(13, 'Harding Morris', 'Tango', 302, '', 2147483647, '1982-03-01', NULL, 7, 286, 702, 'Laith Beard', '', '', 'Saurav Admin', '2019-10-16 09:13:25', NULL, NULL, NULL, 0),
(14, 'Ima Albert', 'sadsadsad4', 415, '', 2147483647, '2010-07-06', NULL, 76, 322, 831, 'Ross Pate', '', '', 'Saurav Admin', '2019-10-16 09:13:25', NULL, NULL, NULL, 0),
(15, 'Yolanda Meadows', 't shirt 2', 457, '', 2147483647, '1992-12-28', NULL, 59, 296, 953, 'Gage Callahan', '', '', 'Saurav Admin', '2019-10-16 09:13:25', NULL, NULL, NULL, 0),
(16, 'Candice Baldwin', 'Saurav', 738, '', 2147482863, '1971-03-14', NULL, 41, 668, 598, 'Octavia Shannon', '', '', 'Saurav Admin', '2019-10-17 10:33:25', NULL, NULL, NULL, 0),
(17, 'Yeo Fernandez', 'Tango', 254, '', 2147482340, '2011-07-10', NULL, 84, 562, 193, 'Jorden Glover', '', '', 'Saurav Admin', '2019-10-22 07:48:29', NULL, NULL, NULL, 0),
(18, 'Dane Mitchell', 'Tango', 154, '', 2147483647, '1996-07-26', NULL, 70, 813, 157, 'Zane Adams', '', '', 'Saurav Admin', '2019-10-16 09:13:25', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order`
--

CREATE TABLE `purchase_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `expected_delivery_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `purchase_status` enum('draft','issued','received','partially_received','cancelled','bills') DEFAULT NULL,
  `total_amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_order`
--

INSERT INTO `purchase_order` (`id`, `supplier`, `order_date`, `expected_delivery_date`, `created_by`, `purchase_status`, `total_amount`) VALUES
(29, 'Ray Hashim JacksonBarrera', '1970-11-27 00:00:00', '1989-01-14 00:00:00', 'sakshamta@test.com', 'issued', 752135),
(30, 'Rose Leilani MuellerPark', '1973-09-10 00:00:00', '1999-03-04 00:00:00', 'sakshamta@test.com', 'issued', 43153),
(31, 'Rose Leilani MuellerPark', '1973-09-10 00:00:00', '1999-03-04 00:00:00', 'sakshamta@test.com', 'draft', 48027);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_item`
--

CREATE TABLE `purchase_order_item` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `purchase_order_no` int(10) UNSIGNED DEFAULT NULL,
  `product_status` enum('received','partially received','cancelled','damage','issued','draft') NOT NULL,
  `received_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_order_item`
--

INSERT INTO `purchase_order_item` (`id`, `product_name`, `quantity`, `discount`, `rate`, `purchase_order_no`, `product_status`, `received_quantity`) VALUES
(7, 'Raphael Ellison', 887, 63, 848, 29, 'issued', 0),
(8, 'Harding Morris', 104, 7, 415, 30, 'issued', 312),
(13, 'Yolanda Meadows', 104, 7, 457, 31, 'draft', 0),
(14, 'Yeo Fernandez', 2, 2, 254, 31, 'draft', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_answer`
--

CREATE TABLE `quiz_answer` (
  `id` int(11) NOT NULL,
  `que_id` int(11) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `correct_answer` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_question`
--

CREATE TABLE `quiz_question` (
  `que_id` int(11) NOT NULL,
  `cat_id` int(10) UNSIGNED DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sales_order_details`
--

CREATE TABLE `sales_order_details` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `sales_order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `expected_shipment_date` datetime DEFAULT NULL,
  `sales_status` enum('draft','confirmed','delivered','cancelled','fulfilled') DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_order_details`
--

INSERT INTO `sales_order_details` (`id`, `customer_name`, `sales_order_date`, `expected_shipment_date`, `sales_status`, `created_by`, `amount`) VALUES
(143, 'Igor Conan NavarroMeyers', '0001-08-01 00:00:00', '1984-07-12 00:00:00', 'fulfilled', 'sakshamta@test.com', 468842),
(144, 'Alden Cruz SimmonsBallard', '2012-11-09 00:00:00', '2014-05-22 00:00:00', 'confirmed', 'sakshamta@test.com', 28),
(145, 'Alden Cruz SimmonsBallard', '1978-02-24 00:00:00', '2001-11-21 00:00:00', 'confirmed', 'sakshamta@test.com', 323327),
(146, 'Alden Cruz SimmonsBallard', '1977-11-25 00:00:00', '1992-02-28 00:00:00', 'delivered', 'sakshamta@test.com', 119305),
(147, 'Phelan Aurora ZimmermanKey', '2016-01-20 00:00:00', '2018-03-16 00:00:00', 'delivered', 'sakshamta@test.com', 189719),
(148, 'Phelan Aurora ZimmermanKey', '1971-06-10 00:00:00', '1989-05-08 00:00:00', 'confirmed', 'sakshamta@test.com', 73094),
(149, 'Alden Cruz SimmonsBallard', '1974-05-26 00:00:00', '1980-02-24 00:00:00', 'confirmed', 'sakshamta@test.com', 62514),
(150, 'Alden Cruz SimmonsBallard', '1997-06-03 00:00:00', '1998-01-11 00:00:00', 'draft', 'sakshamta@test.com', 71062);

-- --------------------------------------------------------

--
-- Table structure for table `sales_order_items`
--

CREATE TABLE `sales_order_items` (
  `id` int(11) NOT NULL,
  `sales_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rate` float NOT NULL,
  `discount` float UNSIGNED ZEROFILL DEFAULT NULL,
  `delivered_quantity` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_order_items`
--

INSERT INTO `sales_order_items` (`id`, `sales_id`, `product_name`, `quantity`, `rate`, `discount`, `delivered_quantity`) VALUES
(285, 143, 'Candice Baldwin', 784, 598, 000000000076, 77),
(286, 145, 'Raphael Ellison', 550, 588, 000000000080, 0),
(287, 146, 'Amery Meadows', 755, 158, 000000000059, 755),
(288, 147, 'Yeo Fernandez', 983, 193, 000000000008, 120),
(289, 148, 'Allen Mccall', 76, 962, 000000000097, 0),
(290, 149, 'Yeo Fernandez', 324, 193, 000000000065, 0),
(294, 150, 'Amery Meadows', 437, 158, 000000000072, 0),
(295, 150, 'Yolanda Meadows', 2, 953, 000000000000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` int(11) NOT NULL,
  `shift` varchar(30) DEFAULT NULL,
  `check_in_time` time NOT NULL,
  `check_out_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id`, `shift`, `check_in_time`, `check_out_time`) VALUES
(1, 'MORNING', '06:00:00', '09:00:00'),
(2, 'DAY', '09:00:00', '12:00:00'),
(3, 'EVENING', '10:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `middle_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_status` enum('active','inactive','suspended','closed') DEFAULT 'inactive',
  `address` varchar(40) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `last_login_ip` int(4) UNSIGNED NOT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_status` enum('online','offline') DEFAULT 'offline',
  `country` varchar(20) DEFAULT NULL,
  `shift` int(11) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `new_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `first_name`, `middle_name`, `last_name`, `email`, `user_password`, `user_status`, `address`, `phone`, `mobile`, `last_login_ip`, `registration_date`, `login_status`, `country`, `shift`, `type_id`, `new_email`) VALUES
(1, 'Saurav', '', 'Adhikari', 'sakshamta@test.com', '$2a$08$hTeTqx91.2fFeFS.RzuqSeDhTbThLhunhT9.Riq06343EAY6LJNSu', 'active', 'Nardevi', '9849784994', '984978949112', 1728716634, '2019-06-11 16:27:25', 'online', 'Nepal', NULL, 3, 'sakshamta@test.com'),
(2, 'Samantha', 'Dean Pruitt', 'Barry', 'admin@test.com', '$2a$10$peWVgctW02aVhzI8kM4fLOCIOegdgIJp8lbu3E0nTBtf4C8O69qDu', 'inactive', 'Rem nulla pariatur ', '450', '39', 455219866, '2019-06-11 16:43:06', 'online', 'Namibia', NULL, 2, NULL),
(200, 'Chadwick', 'Clark Delgado', 'Rollins', 'user@test.com', '$2a$08$OorXBIh2c876cxH8uN1dtOzDCYaf.9KSJY41fHAtZyiiVMQFDw8jy', 'active', 'Debitis consequat P', '704', '40', 3392359626, '2019-07-05 12:24:47', 'offline', 'United States', 1, 1, 'user@test.com'),
(619, 'Alden', 'Cruz Simmons', 'Ballard', 'pafavice@mailinator.com', NULL, 'inactive', 'Saepe modi duis dolo', '95', '1', 0, '2019-10-17 16:28:53', 'offline', 'Austria', NULL, 4, NULL),
(620, 'Phelan', 'Aurora Zimmerman', 'Key', 'ziqopoqo@mailinator.com', NULL, 'inactive', 'Voluptas culpa place', '78', '55', 0, '2019-10-20 11:47:05', 'offline', 'France', NULL, 4, NULL),
(621, 'Geoffrey', 'Ulysses Erickson', 'Bradford', 'wyqapiv@mailinator.com', '$2a$08$2DHKtjm7Ku2I5E77GdvdkOBpqEp1xjHgU3hIDjqwXqnYWfIFN7D9G', 'active', 'Eu amet reiciendis ', '560', '709', 0, '2019-10-22 13:30:10', 'offline', 'Afghanistan', 2, 2, NULL),
(622, 'Noble', 'Hilda Dodson', 'Johns', 'tovotadame@mailinator.net', '$2a$08$fXha3KKoB6lrffLuQ3P7YunqJJ.tSBeiELnwJjTd5muZwPkyNXgP2', 'inactive', 'Officia ad aperiam e', '666', '618', 0, '2019-10-22 13:37:44', 'offline', 'Iran (Islamic Republ', 3, 2, NULL),
(623, 'Evelyn', 'Grady Potts', 'Kerr', 'zejeziqyf@mailinator.com', '$2a$08$VxeA2zZh2jz1PBU4RNqhse8rTrwZbR/1PmBCxDgkXUqa6ou5Sr9Wm', 'inactive', 'Sunt incidunt velit', '275', '618', 0, '2019-10-22 13:44:29', 'offline', 'Monaco', 1, 3, NULL),
(624, 'Hop', 'Odessa England', 'Rasmussen', 'lerurico@mailinator.net', '$2a$08$hFmSih1k9JyJKBBdq09Se.QOTUkzQROpI/PgeJTPYEatL7DnwkFvm', 'inactive', 'Accusantium officia ', '855', '485', 0, '2019-10-22 13:46:05', 'offline', 'Malawi', 2, 1, NULL),
(626, 'Hop', 'Odessa England', 'Rasmussen', 'lerlurico@mailinator.net', '$2a$08$74N1AhuhXIHTxJ5Wqhz8veGIl.oYgaEyhY60AAqijp4wIMRp7IP32', 'inactive', 'Accusantium officia ', '855', '485', 0, '2019-10-22 13:46:20', 'offline', 'Malawi', 2, 1, NULL),
(627, 'April', 'Alea Ellison', 'Rollins', 'rygu@mailinator.net', '$2a$08$gGbvbzregnhNqdXHR4iXfuEp7/DLZSpuGdnkS5Y6k0HIxKXknd3gW', 'inactive', 'Animi nihil porro f', '917', '915', 0, '2019-10-22 13:51:02', 'offline', 'Singapore', 2, 3, NULL),
(628, 'Rose', 'Leilani Mueller', 'Park', 'kava@mailinator.com', NULL, 'inactive', 'Sit dolore labore in', '28', '34', 0, '2019-10-22 14:03:39', 'offline', 'Azerbaijan', NULL, 5, NULL),
(629, 'Ray', 'Hashim Jackson', 'Barrera', 'dewynoq@mailinator.com', NULL, 'inactive', 'Et omnis quia debiti', '48', '21', 0, '2019-10-22 14:36:15', 'offline', 'Greenland', NULL, 5, NULL),
(630, 'Noelle', 'Zephania Weeks', 'Hinton', 'qibo@mailinator.com', '$2a$08$vEB2lYWb3qcHkbnTL0.Yoeg4t6Foepz2CNjyzaJ1DUdoyGSJAzZxa', 'inactive', 'Iste qui dolores com', '415', '140', 0, '2019-11-10 16:43:37', 'offline', 'Latvia', 3, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `title` enum('user','admin','superadmin','customer','supplier') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `title`) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'superadmin'),
(4, 'customer'),
(5, 'supplier');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_log_ibfk_1` (`log_user`);

--
-- Indexes for table `apps_countries`
--
ALTER TABLE `apps_countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug_unique` (`slug`),
  ADD UNIQUE KEY `c_name` (`c_name`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `checklog`
--
ALTER TABLE `checklog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_adjustment`
--
ALTER TABLE `inventory_adjustment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjusted_by` (`adjusted_by`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `login_attempt`
--
ALTER TABLE `login_attempt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login_attempt_ibfk_1` (`email`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `module_permission`
--
ALTER TABLE `module_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_slug` (`category`);

--
-- Indexes for table `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_ibfk_1` (`created_by`);

--
-- Indexes for table `purchase_order_item`
--
ALTER TABLE `purchase_order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_item_ibfk_1` (`purchase_order_no`);

--
-- Indexes for table `quiz_answer`
--
ALTER TABLE `quiz_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `que_id` (`que_id`);

--
-- Indexes for table `quiz_question`
--
ALTER TABLE `quiz_question`
  ADD PRIMARY KEY (`que_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_order_details_ibfk_1` (`created_by`);

--
-- Indexes for table `sales_order_items`
--
ALTER TABLE `sales_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_order_items_ibfk_1` (`sales_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `new_email` (`new_email`),
  ADD KEY `fk_shift` (`shift`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=901;

--
-- AUTO_INCREMENT for table `apps_countries`
--
ALTER TABLE `apps_countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `checklog`
--
ALTER TABLE `checklog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory_adjustment`
--
ALTER TABLE `inventory_adjustment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_attempt`
--
ALTER TABLE `login_attempt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `module_permission`
--
ALTER TABLE `module_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=523;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `purchase_order`
--
ALTER TABLE `purchase_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `purchase_order_item`
--
ALTER TABLE `purchase_order_item`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quiz_answer`
--
ALTER TABLE `quiz_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_question`
--
ALTER TABLE `quiz_question`
  MODIFY `que_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `sales_order_items`
--
ALTER TABLE `sales_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=296;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=631;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `activity_log_ibfk_1` FOREIGN KEY (`log_user`) REFERENCES `user_table` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventory_adjustment`
--
ALTER TABLE `inventory_adjustment`
  ADD CONSTRAINT `inventory_adjustment_ibfk_1` FOREIGN KEY (`adjusted_by`) REFERENCES `user_table` (`email`),
  ADD CONSTRAINT `inventory_adjustment_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `login_attempt`
--
ALTER TABLE `login_attempt`
  ADD CONSTRAINT `login_attempt_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user_table` (`email`) ON UPDATE CASCADE;

--
-- Constraints for table `module_permission`
--
ALTER TABLE `module_permission`
  ADD CONSTRAINT `module_permission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `module_permission_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`);

--
-- Constraints for table `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD CONSTRAINT `email_fk` FOREIGN KEY (`created_by`) REFERENCES `user_table` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase_order_item`
--
ALTER TABLE `purchase_order_item`
  ADD CONSTRAINT `purchase_order_item_ibfk_1` FOREIGN KEY (`purchase_order_no`) REFERENCES `purchase_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_answer`
--
ALTER TABLE `quiz_answer`
  ADD CONSTRAINT `quiz_answer_ibfk_1` FOREIGN KEY (`que_id`) REFERENCES `quiz_question` (`que_id`);

--
-- Constraints for table `quiz_question`
--
ALTER TABLE `quiz_question`
  ADD CONSTRAINT `quiz_question_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  ADD CONSTRAINT `sales_order_details_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user_table` (`email`) ON UPDATE CASCADE;

--
-- Constraints for table `sales_order_items`
--
ALTER TABLE `sales_order_items`
  ADD CONSTRAINT `sales_order_items_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales_order_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_table`
--
ALTER TABLE `user_table`
  ADD CONSTRAINT `fk_shift` FOREIGN KEY (`shift`) REFERENCES `shift` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
