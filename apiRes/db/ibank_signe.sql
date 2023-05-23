-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 23 mai 2023 à 19:02
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ibank_signe`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateurs`
--

CREATE TABLE `administrateurs` (
  `id` int(11) NOT NULL,
  `reference` varchar(31) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `statut` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `administrateurs`
--

INSERT INTO `administrateurs` (`id`, `reference`, `nom`, `prenom`, `email`, `telephone`, `password`, `profile`, `statut`, `created_at`, `updated_at`) VALUES
(1, 'IBANK-KEOANVZGKIC5DZI9UQVDXACBN', 'ADMIN', 'Rooter', 'admin@gmail.com', '+225 5798457152', '$2b$10$ddGAFRq88qNLFgHLIEop.uOQKnfZj4nJIAHzVkzKyAs6jRG9BQcaa', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png', 1, '2023-05-23 16:57:44', '2023-05-23 16:57:44'),
(2, 'IBANK-87NKDSCG9NNJKMAVLWC1WBQ17', 'DJOBO', 'N\'dri François Carêm', 'nfcdjobo@gmail.com', '+225 6219534696', '$2b$10$uJbdbVUY54S.R2F4665aqukkz.oDElPOtpCVdCFtHRiK9MMKSCXka', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png', 1, '2023-05-23 16:57:44', '2023-05-23 16:57:44'),
(3, 'IBANK-WBCH5H9SDQ6BICWZSO4JLEDWF', 'ZAZAZAZ', 'AZAZAA', 'AZAZA@ZZAAZ.ZZZ', '212333232323', 'QSSDSDDSS', NULL, 1, '2023-05-23 16:58:49', '2023-05-23 16:58:49');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `reference` varchar(31) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` text DEFAULT NULL,
  `statut` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `reference`, `nom`, `prenom`, `email`, `telephone`, `password`, `profile`, `statut`, `created_at`, `updated_at`) VALUES
(1, 'IBANK-TGCTR96V9M43R3QUBNL6LIHKW', 'Kobenan', 'Kobenan Alain', 'alain@gmail.com', '+225 1083609104', '$2b$10$ufvHT3y3DUfORys3uWaIou2azvkPU9DKh2qAaDa0bC8uqsqBISIkG', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png', 1, '2023-05-23 16:57:44', '2023-05-23 16:57:44'),
(2, 'IBANK-QSV2J9D55WNUIGMKOWO8ATXM3', 'AKA ', 'Koffi jean luis', 'jeanluis@gmail.com', '+225 3827152698', '$2b$10$sCr.9ypBy3PNwet6VAkzxudZE5tA2JKQSAKs9JUOKAjaq5Ih473tC', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png', 1, '2023-05-23 16:57:44', '2023-05-23 16:57:44');

-- --------------------------------------------------------

--
-- Structure de la table `compte_prets`
--

CREATE TABLE `compte_prets` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `pourcentage` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `configurations`
--

CREATE TABLE `configurations` (
  `id` int(11) NOT NULL,
  `reference` varchar(31) NOT NULL,
  `raisonSociale` varchar(100) NOT NULL,
  `accromine` varchar(10) NOT NULL,
  `email1` varchar(255) NOT NULL,
  `email2` varchar(255) DEFAULT NULL,
  `telephone1` varchar(20) NOT NULL,
  `telephone2` varchar(20) DEFAULT NULL,
  `logo1` text NOT NULL,
  `logo2` text DEFAULT NULL,
  `copyRight` varchar(255) NOT NULL,
  `interetContisation` int(11) NOT NULL,
  `interetPret` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `configurations`
--

INSERT INTO `configurations` (`id`, `reference`, `raisonSociale`, `accromine`, `email1`, `email2`, `telephone1`, `telephone2`, `logo1`, `logo2`, `copyRight`, `interetContisation`, `interetPret`, `created_at`, `updated_at`) VALUES
(1, 'IBANK-OILCQ5R7I09HSV0U8GNKEY9I5', 'IBANK SIGNE SIGNE', 'ISS', 'ibank-ssign@gmail.com', 'infos-signe@gmail.com', '+225 0707070007', '+225 0554544554', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/90.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/100.png', 'copyRight', 2, 3, '2023-05-23 16:57:44', '2023-05-23 16:57:44');

-- --------------------------------------------------------

--
-- Structure de la table `cotisations`
--

CREATE TABLE `cotisations` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `montant` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `engagements`
--

CREATE TABLE `engagements` (
  `id` int(11) NOT NULL,
  `reference` varchar(31) NOT NULL,
  `periode` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `moyenPaiement` varchar(50) NOT NULL,
  `comptePaiement` varchar(50) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `interets`
--

CREATE TABLE `interets` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `taux` int(11) NOT NULL,
  `unite` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_retrait` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `messageries`
--

CREATE TABLE `messageries` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `sujet` text NOT NULL,
  `contenu` text NOT NULL,
  `expeditaire` int(11) NOT NULL,
  `receveur` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `retraits`
--

CREATE TABLE `retraits` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `montant` int(11) NOT NULL,
  `frais` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL,
  `id_beneficiaire` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `soldes`
--

CREATE TABLE `soldes` (
  `id` int(11) NOT NULL,
  `reference` varchar(31) NOT NULL,
  `montant` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `taux_interets`
--

CREATE TABLE `taux_interets` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `pourcentage` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `montant` int(11) NOT NULL,
  `frais` int(11) NOT NULL,
  `expediteur` int(11) NOT NULL,
  `beneficiaire` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `administrateurs_reference_unique` (`reference`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clients_reference_unique` (`reference`),
  ADD UNIQUE KEY `clients_email_unique` (`email`),
  ADD UNIQUE KEY `clients_telephone_unique` (`telephone`);

--
-- Index pour la table `compte_prets`
--
ALTER TABLE `compte_prets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `configurations_reference_unique` (`reference`),
  ADD UNIQUE KEY `configurations_email1_unique` (`email1`),
  ADD UNIQUE KEY `configurations_telephone1_unique` (`telephone1`),
  ADD UNIQUE KEY `configurations_copyRight_unique` (`copyRight`),
  ADD UNIQUE KEY `configurations_email2_unique` (`email2`),
  ADD UNIQUE KEY `configurations_telephone2_unique` (`telephone2`);

--
-- Index pour la table `cotisations`
--
ALTER TABLE `cotisations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `engagements`
--
ALTER TABLE `engagements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `interets`
--
ALTER TABLE `interets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_retrait` (`id_retrait`);

--
-- Index pour la table `messageries`
--
ALTER TABLE `messageries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `expeditaire` (`expeditaire`),
  ADD KEY `receveur` (`receveur`);

--
-- Index pour la table `retraits`
--
ALTER TABLE `retraits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_destinataire` (`id_destinataire`),
  ADD KEY `id_beneficiaire` (`id_beneficiaire`);

--
-- Index pour la table `soldes`
--
ALTER TABLE `soldes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `taux_interets`
--
ALTER TABLE `taux_interets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `frais` (`frais`),
  ADD KEY `expediteur` (`expediteur`),
  ADD KEY `beneficiaire` (`beneficiaire`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `compte_prets`
--
ALTER TABLE `compte_prets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cotisations`
--
ALTER TABLE `cotisations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `engagements`
--
ALTER TABLE `engagements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `interets`
--
ALTER TABLE `interets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messageries`
--
ALTER TABLE `messageries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `retraits`
--
ALTER TABLE `retraits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `soldes`
--
ALTER TABLE `soldes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `taux_interets`
--
ALTER TABLE `taux_interets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `compte_prets`
--
ALTER TABLE `compte_prets`
  ADD CONSTRAINT `compte_prets_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `cotisations`
--
ALTER TABLE `cotisations`
  ADD CONSTRAINT `cotisations_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `engagements`
--
ALTER TABLE `engagements`
  ADD CONSTRAINT `engagements_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `interets`
--
ALTER TABLE `interets`
  ADD CONSTRAINT `interets_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `interets_ibfk_2` FOREIGN KEY (`id_retrait`) REFERENCES `retraits` (`id`);

--
-- Contraintes pour la table `messageries`
--
ALTER TABLE `messageries`
  ADD CONSTRAINT `messageries_ibfk_1` FOREIGN KEY (`expeditaire`) REFERENCES `administrateurs` (`id`),
  ADD CONSTRAINT `messageries_ibfk_2` FOREIGN KEY (`receveur`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `retraits`
--
ALTER TABLE `retraits`
  ADD CONSTRAINT `retraits_ibfk_1` FOREIGN KEY (`id_destinataire`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `retraits_ibfk_2` FOREIGN KEY (`id_beneficiaire`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `soldes`
--
ALTER TABLE `soldes`
  ADD CONSTRAINT `soldes_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`frais`) REFERENCES `interets` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`expediteur`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`beneficiaire`) REFERENCES `clients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
