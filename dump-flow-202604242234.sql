/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: 192.168.2.134    Database: flow
-- ------------------------------------------------------
-- Server version	11.4.10-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Picture`
--

DROP TABLE IF EXISTS `Picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Picture` (
  `id` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `listingId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Picture_listingId_idx` (`listingId`),
  CONSTRAINT `Picture_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Picture`
--

LOCK TABLES `Picture` WRITE;
/*!40000 ALTER TABLE `Picture` DISABLE KEYS */;
INSERT INTO `Picture` VALUES
('020c3fc5-f3e5-4d8f-afbf-5a871e3110d9','/uploads/listings/1b31216c-872a-4267-a496-665f7f4c973f.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:03.237','2026-04-16 07:10:03.237'),
('08166e26-5a81-40d9-a711-572a879f3713','/uploads/listings/f2b0a124-82ee-4113-98a8-45b9c35d63e2.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:03.289','2026-04-16 07:10:03.289'),
('2d16e7fb-3ab5-4fe9-9dea-32ff5b245d92','/uploads/listings/99c28863-0326-420a-8cd1-a847f9cc5001.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:13.041','2026-04-16 07:10:13.041'),
('5b6d41fd-b71f-438a-bdf6-aa92d5bc1ccc','/uploads/listings/7e293aa0-b30c-4af9-9722-41e215b3748c.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:03.250','2026-04-16 07:10:03.250'),
('5dd0c5d5-abe6-441b-b4f2-52767ce36972','/uploads/listings/e8128899-f853-4d4f-b527-f76b0a0e80ee.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:13.176','2026-04-16 07:10:13.176'),
('61d11081-8eca-4ef6-a548-7a08b96f166d','/uploads/listings/6ca66c71-1b1a-46a4-ae28-b007feceb14e.jpg','338a7ce7-2404-46df-a8fe-11939175e988','2026-04-21 06:19:31.431','2026-04-21 06:19:31.431'),
('6938ef33-8335-44ec-ab15-5ffa467738a6','/uploads/listings/0a25d9fa-129c-4770-88e7-fd5fba598768.jpg','4d3fca94-7aeb-4b00-a90d-03573a073f5f','2026-04-19 11:34:54.486','2026-04-19 11:34:54.486'),
('7e532769-4486-46b4-a1a2-293f884f56c4','/uploads/listings/15b6acc2-037b-4f92-8c19-5e3132730580.jpeg','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-16 07:10:13.292','2026-04-16 07:10:13.292'),
('8df3fcf0-0169-4f93-9d95-e737650a3100','/uploads/listings/e4c42e00-44f5-4bb9-afc2-77cf53246f9d.jpg','4d3fca94-7aeb-4b00-a90d-03573a073f5f','2026-04-19 11:34:54.576','2026-04-19 11:34:54.576'),
('b863fef5-b080-4c0b-9ec6-6b3ab8c0efe0','/uploads/listings/bc30f283-359e-455e-bd5a-fee01ece3081.gif','f5359e38-0e31-4d94-b077-6ec03b06b5ce','2026-04-21 08:30:16.066','2026-04-21 08:30:16.066'),
('d8ee9762-5ac4-44d9-b759-56cc275104d7','/uploads/listings/6c044b14-656f-4d07-9c2f-6e9d755e94fd.jpg','4d3fca94-7aeb-4b00-a90d-03573a073f5f','2026-04-19 11:34:54.663','2026-04-19 11:34:54.663');
/*!40000 ALTER TABLE `Picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExpoPushToken`
--

DROP TABLE IF EXISTS `ExpoPushToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExpoPushToken` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expoPushToken` text NOT NULL,
  `platform` enum('IOS','ANDROID') NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `lastSeenAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExpoPushToken_userId_expoPushToken_key` (`userId`,`expoPushToken`(191)),
  KEY `ExpoPushToken_userId_active_idx` (`userId`,`active`),
  CONSTRAINT `ExpoPushToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExpoPushToken`
--

LOCK TABLES `ExpoPushToken` WRITE;
/*!40000 ALTER TABLE `ExpoPushToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExpoPushToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatRoom`
--

DROP TABLE IF EXISTS `ChatRoom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatRoom` (
  `id` varchar(191) NOT NULL,
  `forListingId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ChatRoom_forListingId_fkey` (`forListingId`),
  CONSTRAINT `ChatRoom_forListingId_fkey` FOREIGN KEY (`forListingId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatRoom`
--

LOCK TABLES `ChatRoom` WRITE;
/*!40000 ALTER TABLE `ChatRoom` DISABLE KEYS */;
INSERT INTO `ChatRoom` VALUES
('127e1e21-d085-4c1f-9ade-be5cda9b5c0d','4d3fca94-7aeb-4b00-a90d-03573a073f5f','2026-04-19 13:03:26.708','2026-04-19 13:03:26.708'),
('203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-19 13:39:34.707','2026-04-19 13:39:34.707'),
('7049c58f-e2ae-478e-ae60-02e2a561ad3d','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-23 18:17:14.049','2026-04-23 18:17:14.049'),
('b329608c-1151-46c5-aa94-3617d7237871','d6da1f97-c31e-48a0-86b1-481c4924a62f','2026-04-21 09:04:25.855','2026-04-21 09:04:25.855'),
('e763893e-6141-4d59-a358-43d89bd46c86','338a7ce7-2404-46df-a8fe-11939175e988','2026-04-19 13:45:26.518','2026-04-19 13:45:26.518');
/*!40000 ALTER TABLE `ChatRoom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Listing` (
  `id` varchar(191) NOT NULL,
  `title` text NOT NULL,
  `url` text NOT NULL,
  `description` text NOT NULL,
  `status` enum('AVAILABLE','PENDING','FROZEN','SOLD','ARCHIVED') NOT NULL DEFAULT 'PENDING',
  `category` enum('ELECTRONICS','FASHION','HOME','TOYS','BOOKS','SPORTS','OTHER') NOT NULL,
  `price` double NOT NULL,
  `discountedPrice` double DEFAULT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Listing_userId_fkey` (`userId`),
  CONSTRAINT `Listing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES
('338a7ce7-2404-46df-a8fe-11939175e988','iPhone 15 Pro','lol-338a7ce7','Brand new, sealed in box','FROZEN','ELECTRONICS',800000,50000,'XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','2026-04-16 12:23:56.315','2026-04-21 08:49:59.987'),
('4d3fca94-7aeb-4b00-a90d-03573a073f5f','Eladó egy nagyon melegedő Inno3D 3070 Twin X2 alacsony áron!','elad-egy-nagyon-meleged-inno3d-3070-twin-x2-alacsony-ron-4d3fca94','Sziasztok.Eladó egy nagyon melegedő Inno3D 3070 Twin X2 alacsony áron!Itt vettem Hardveraprón.Vásárláskor tudtam a jelenségről gondoltam megoldom.De sajnos meghaladja a képességeimet.Amit tudni lehet a kártyáról:Tökéletesen lemegy az összes teszt.Játszani is lehet vele.Az összes port működik.De nagyon magasak a hőfokok.Hiába pasztáztam és thermal padoztam nagyon magas a hőmérséklete.Főleg a hot spot.Az majdnem a 100 fokot nyaldossa.Ami szerintem kurva magas.Igazából nem találtam leírást milyen padok kellenek rá.Amit fórumokon olvastam azokat raktam rá de így is meleg.Én nekem erre nincs sajnos időm meg nem is szeretnék vele foglalkozni meg még pénzt ölni bele.Mivel nem 100-as a kártya így csak személyesen adnám el lehetőleg.Eljössz kipróbálod nézel amit akarsz és viszed.Ha kell egy óráig állítgathatod nyúzhatod de ha elvitted akkor nincs már rá garancia ha esetleg megfőzöd.Úgyhogy ennek tudatába érdeklődj.Amúgy ha a power imitet leveszem 70-80-ra akkor már nincsenek életveszélyes hőfokok.Szóval ez van.Adok még ajándékba egy új ventilátort is hozzá.Személyes átvétel Újpesten.Köszi hogy benéztél.További szép napot.\nUi:Ezt kihagytam.A a kis világítás nem megy ami van rajta.Szerintem kiszerelték belőle anno.\nNEM EGY MENTHETETLEN GPU HIBÁS KÁRTYA!','AVAILABLE','ELECTRONICS',60000,NULL,'joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','2026-04-19 11:34:54.379','2026-04-19 14:18:13.525'),
('d6da1f97-c31e-48a0-86b1-481c4924a62f','Cucc','cucc-d6da1f97','Tartalekos cucc','AVAILABLE','HOME',1000,0,'1QSTRZxl3hwlsWtps1y83KplXuXhUfL4','2026-04-15 04:51:21.373','2026-04-16 07:10:12.424'),
('f5359e38-0e31-4d94-b077-6ec03b06b5ce','Vaping cat','vaping-cat-f5359e38','a vaping cat as you can see, just buy it already','SOLD','OTHER',1000000,999999,'1QSTRZxl3hwlsWtps1y83KplXuXhUfL4','2026-04-10 08:30:15.808','2026-04-21 09:00:36.451');
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_SavedListings`
--

DROP TABLE IF EXISTS `_SavedListings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_SavedListings` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL,
  UNIQUE KEY `_SavedListings_AB_unique` (`A`,`B`),
  KEY `_SavedListings_B_index` (`B`),
  CONSTRAINT `_SavedListings_A_fkey` FOREIGN KEY (`A`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_SavedListings_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_SavedListings`
--

LOCK TABLES `_SavedListings` WRITE;
/*!40000 ALTER TABLE `_SavedListings` DISABLE KEYS */;
INSERT INTO `_SavedListings` VALUES
('d6da1f97-c31e-48a0-86b1-481c4924a62f','1QSTRZxl3hwlsWtps1y83KplXuXhUfL4'),
('338a7ce7-2404-46df-a8fe-11939175e988','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL'),
('4d3fca94-7aeb-4b00-a90d-03573a073f5f','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy');
/*!40000 ALTER TABLE `_SavedListings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(191) NOT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `image` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('1QSTRZxl3hwlsWtps1y83KplXuXhUfL4','Bars','kovacs.bars@gmail.com',1,'/uploads/avatars/7c6ce786-7a9f-4813-872c-bd7799b102f4.jpeg','2026-04-14 07:11:32.039','2026-04-19 11:28:41.043','ADMIN'),
('joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','Tamás Vince','nemvince@proton.me',1,'https://avatars.githubusercontent.com/u/137005713?v=4','2026-04-17 08:37:08.442','2026-04-17 08:37:08.442','USER'),
('xFREwGewjAcTM4ICx7k5EQdVePHcEfHl','teszt','teszt@szak.it',0,NULL,'2026-04-21 07:27:43.894','2026-04-21 07:27:43.894','USER'),
('XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','Szaki','sz.szigeti2@gmail.com',1,'/uploads/avatars/f0dd4d3d-f32b-4ea3-b22e-78027754e1a7.gif','2026-03-31 10:10:18.308','2026-04-19 15:55:18.011','ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `byUserId` varchar(191) NOT NULL,
  `chatRoomId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_chatRoomId_idx` (`chatRoomId`),
  KEY `Message_byUserId_fkey` (`byUserId`),
  CONSTRAINT `Message_byUserId_fkey` FOREIGN KEY (`byUserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Message_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES
('00f5051d-292c-4933-a0e1-39d948705fb1','szia','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:22.049','2026-04-24 03:58:22.049'),
('02624c6c-a144-4c98-82df-77bbbbe93069','meg igy se jo','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 15:59:40.270','2026-04-19 15:59:40.270'),
('0776646e-6a5a-4628-a0c5-e20d6ef7bf70','https://reactbits.dev/backgrounds/dither','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:42:24.397','2026-04-19 13:42:24.397'),
('0f275b97-e7d7-4572-9fef-93b80f1b6703','szia bizottsag','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:29.078','2026-04-19 13:43:29.078'),
('14b28c4a-ea53-4e60-a717-0c823a574f2a','szi','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 17:04:35.007','2026-04-23 17:04:35.007'),
('16596583-6524-46c4-8ead-2613597254cd','asd','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 16:28:37.213','2026-04-23 16:28:37.213'),
('19944e0a-802d-48d5-9e96-51ac229c5bdb','szegenynek igy is eleg traumaja volt','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 13:49:15.018','2026-04-19 13:49:15.018'),
('1aabc3f8-37e8-4eae-b996-85729050c9b5','csirek','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:58.105','2026-04-24 03:59:58.105'),
('1f850589-fe11-466b-8706-c0f21cdf1f6d','fel se tunt','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 14:04:10.598','2026-04-19 14:04:10.598'),
('1fae71e8-65a8-4603-aca5-f05a53c5a504','aha','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:51.224','2026-04-24 03:58:51.224'),
('25141221-de1b-48f0-9e29-a36b2d71c301','xdd','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:52.390','2026-04-19 13:41:52.390'),
('266ef67c-e287-443c-8909-26e8873e0f16','eloszor is','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:32.959','2026-04-19 13:41:32.959'),
('278dc94e-d9a2-4502-bd98-061706e5dacd','muszaj','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 14:00:00.809','2026-04-19 14:00:00.809'),
('286e519a-6a4a-40e5-a6e3-04e16cada826','erdekelne a kartyad','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:07:50.129','2026-04-19 13:07:50.129'),
('30e96a0d-5337-49c2-8d2b-0444f40199bb','melyik weboldalol tepted ki az auth backgroundod','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:47.262','2026-04-19 13:41:47.262'),
('31842a05-8668-470c-aa58-9fa07f13f15a','szia','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:40:51.973','2026-04-19 13:40:51.973'),
('31d5dfe2-0c33-44fc-ac3e-f7a564c44c39','Annyira varom mar hogy projektvedesnel bemutassam ezt a beszelgetest','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:21.649','2026-04-19 13:43:21.649'),
('31f8e305-82d3-4144-8eda-8c8addb1a3f0','puszi','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 16:28:48.689','2026-04-19 16:28:48.689'),
('368084b6-789c-4e5b-a0e1-0022c0606240','gyanusan','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:46:03.010','2026-04-19 13:46:03.010'),
('3ba3406d-2054-49d0-8a72-bbd968a855a7','szia','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 16:17:53.092','2026-04-23 16:17:53.092'),
('432dd487-8fd5-4182-ac79-6c5d97ef1e34','asd','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 18:06:44.936','2026-04-23 18:06:44.936'),
('4499cb81-a213-471c-847e-7af8d0ea852f','ye','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:50.073','2026-04-19 13:43:50.073'),
('45d4075a-88c2-4636-ab48-1d5f0d1716da','na most megveszed amugy vagy sem','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:42:59.174','2026-04-19 13:42:59.174'),
('4beb75a7-cea0-49f0-a2cc-dbda255e306f','rossz a css','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:45:47.836','2026-04-19 13:45:47.836'),
('4fbbca36-bb9d-4380-a1f9-688ae95422e6','nah','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:14.128','2026-04-19 13:41:14.128'),
('54c12254-e2db-4026-8e1e-2d0a29022712','senkit nem erdekel','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:08.053','2026-04-24 03:59:08.053'),
('54dd91ee-9832-4a0f-b13f-82f6d10c4cd5','koszonom','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:44.189','2026-04-19 13:43:44.189'),
('57155d64-340f-4de6-bddf-1ef8fbb80bf2','szi','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 16:25:07.196','2026-04-23 16:25:07.196'),
('606fa3e8-4078-499f-9a9e-32d4b5605b66','olyan mint te','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:01.672','2026-04-19 13:41:01.672'),
('6325d956-c478-479b-9ad5-55349715cb81','vilag legjobb chatje','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:45:07.771','2026-04-19 13:45:07.771'),
('6f8b73dd-a85a-455d-b337-e6bbc203857e','ez amugy meno','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:25.318','2026-04-19 13:41:25.318'),
('765cf471-888a-4949-a26e-37a4bfd43c88','szi','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 16:28:18.054','2026-04-23 16:28:18.054'),
('7baa8adc-8a37-4213-8ecd-3e1d855cabb1','xddddddddddddddddddddddd','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:48.450','2026-04-24 03:59:48.450'),
('7c154d66-acfb-4f0f-ab4e-5bef8513e348','fhu te','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:17.808','2026-04-24 03:59:17.808'),
('81895cad-8ab9-42d1-9c56-34991ce62449','asd','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 16:29:25.822','2026-04-23 16:29:25.822'),
('86b45004-3af5-4237-98b1-7064fa3830ca','meleg','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:00.041','2026-04-19 13:41:00.041'),
('86de7d7c-1730-4176-982f-b6879b706c04','szia hali ezt megvennem ingyen','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 13:45:32.672','2026-04-19 13:45:32.672'),
('87f92c8f-db2d-413c-8eaf-33dd37f4c44a','amugy gepnel vagy?','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:46.296','2026-04-19 13:43:46.296'),
('8f2ca81c-3236-4a87-ba04-9566f4df65e2','Tudnál arról beszélni mit árulsz?','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-21 07:23:03.883','2026-04-21 07:23:03.883'),
('92f5f9b0-e365-4964-b008-f62b1eecebf5','igen','1QSTRZxl3hwlsWtps1y83KplXuXhUfL4','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-21 08:43:27.615','2026-04-21 08:43:27.615'),
('98105567-28bf-4763-8bce-ca8ac00d9b76','na','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:41.562','2026-04-24 03:59:41.562'),
('99a3a281-1cd4-4ea5-8c24-98ae798d81f3','hali','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:40.357','2026-04-24 03:58:40.357'),
('a1a9b648-7fc9-4c15-90d9-b2f9f7998f83','Most nezem','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:45:16.972','2026-04-19 13:45:16.972'),
('a2f67193-7772-4c91-8a80-3eb91006ba7c','gondoltam h reactbits','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:42:49.534','2026-04-19 13:42:49.534'),
('a588db6b-f08b-4ad4-bdef-46d2c884c7b3','fhu','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:20.608','2026-04-24 03:59:20.608'),
('ab8b1c00-950a-4ee6-a75e-092a5f25b8f1','yes','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-23 17:23:43.855','2026-04-23 17:23:43.855'),
('ac0b927c-1913-4f23-a45e-d4c78bb42681','telon miert lehet jobbrabalra gorgetni','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:45:30.669','2026-04-19 13:45:30.669'),
('afc0ffd7-b20e-4822-a913-4efd9b60f1de','es visszahozod','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:05.929','2026-04-19 13:41:05.929'),
('b2b3ba52-d4a8-47ed-b46a-e2a07c6ced8b','ugye tudod hogy melegszik','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:40:59.368','2026-04-19 13:40:59.368'),
('b85e4b86-7e9c-4826-bcf4-d4b6a41f82a3','ink nem','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 13:49:18.484','2026-04-19 13:49:18.484'),
('badaaede-a87a-4615-af1d-8386269f7142','og','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:44:23.485','2026-04-19 13:44:23.485'),
('bb4f6a79-dc6d-48a9-b928-9df5c2b608fb','tartsd meg','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:00.283','2026-04-24 03:59:00.283'),
('bbd13bdd-b43d-4bf6-9c39-de723ef9db34','de melegeszik','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:54.098','2026-04-24 03:58:54.098'),
('c0feb2ea-15f0-4704-9f9d-c987eb53f7f2','updatelve lett a css','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 14:04:08.290','2026-04-19 14:04:08.290'),
('c781b998-f876-45f5-8dc8-76563c6af903','oke','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:26.050','2026-04-19 13:41:26.050'),
('d595594b-a488-489f-a884-706b8611525f','Szia','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','2026-04-19 13:39:43.937','2026-04-19 13:39:43.937'),
('d943aad5-d474-49c0-8722-af723408b3dd','szia','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:40:54.995','2026-04-19 13:40:54.995'),
('da38c8d7-266f-4664-8384-e1429cbe4480','ejha','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:45:45.111','2026-04-19 13:45:45.111'),
('da86d83a-3b83-476c-9482-6658946f6fcb','<h1>sanitizeolsz?</h1>','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:38.711','2026-04-24 03:59:38.711'),
('dae72f3c-5a15-462b-8c98-cf3dacd6bbec','Szia kedves vince','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:07:43.400','2026-04-19 13:07:43.400'),
('e03ccde2-1367-440b-943b-83aebcffa228','most azonnal az osszes lightroom preseted dobd at','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:43:57.682','2026-04-19 13:43:57.682'),
('e2ff62a6-610d-447e-8a63-49f7f2c3554f','anyadnak irogassal','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:59:09.163','2026-04-24 03:59:09.163'),
('e3d1dfa7-b41a-43d2-b304-f58327fe4111','nincs kep a hirdetesrol','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:36.417','2026-04-19 13:41:36.417'),
('e558ed89-4d5a-4c39-9a9a-d6f5b9502e69','es ha megveszed','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:03.672','2026-04-19 13:41:03.672'),
('e903bce5-d8e8-4e03-b33d-5e2a46391933','elado meg?','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:46.683','2026-04-24 03:58:46.683'),
('e9fd9473-66fa-4a27-ac31-1f2f5e89aef2','nagyon meleg','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-24 03:58:58.738','2026-04-24 03:58:58.738'),
('ed049b33-4618-4db9-957a-c24ac3d45d01','masodszor is','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:41:38.951','2026-04-19 13:41:38.951'),
('f873f0c2-ad1a-4fe1-97cf-a0ff42ff7fe5','ez ni','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:42:26.986','2026-04-19 13:42:26.986'),
('f9892187-9036-4aa2-b990-7386f70b2ecf','kene vmi meno','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','127e1e21-d085-4c1f-9ade-be5cda9b5c0d','2026-04-19 13:44:00.000','2026-04-19 13:44:00.000'),
('feacebbf-12ce-45e4-bffa-93e00dd068d2','ezt a negylabu valamit','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL','e763893e-6141-4d59-a358-43d89bd46c86','2026-04-19 13:45:36.943','2026-04-19 13:45:36.943');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_UserChats`
--

DROP TABLE IF EXISTS `_UserChats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_UserChats` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL,
  UNIQUE KEY `_UserChats_AB_unique` (`A`,`B`),
  KEY `_UserChats_B_index` (`B`),
  CONSTRAINT `_UserChats_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChatRoom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_UserChats_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_UserChats`
--

LOCK TABLES `_UserChats` WRITE;
/*!40000 ALTER TABLE `_UserChats` DISABLE KEYS */;
INSERT INTO `_UserChats` VALUES
('203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','1QSTRZxl3hwlsWtps1y83KplXuXhUfL4'),
('7049c58f-e2ae-478e-ae60-02e2a561ad3d','1QSTRZxl3hwlsWtps1y83KplXuXhUfL4'),
('b329608c-1151-46c5-aa94-3617d7237871','1QSTRZxl3hwlsWtps1y83KplXuXhUfL4'),
('127e1e21-d085-4c1f-9ade-be5cda9b5c0d','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL'),
('e763893e-6141-4d59-a358-43d89bd46c86','joYwP6n2lKuPQ7JXOKQLFnSVaDJH3LuL'),
('127e1e21-d085-4c1f-9ade-be5cda9b5c0d','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy'),
('203b16c4-3fc4-4e8f-8e1c-b5494d33e1cc','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy'),
('e763893e-6141-4d59-a358-43d89bd46c86','XZVSvy5DL5bAkROyDTRKqeQv5NL80oyy');
/*!40000 ALTER TABLE `_UserChats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-24 22:34:53
