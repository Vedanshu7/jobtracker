USE [master]
GO
/****** Object:  Database [JobTracker]    Script Date: 01-12-2023 23:10:37 ******/
CREATE DATABASE [JobTracker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JobTracker', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\JobTracker.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JobTracker_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\JobTracker_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [JobTracker] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [JobTracker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [JobTracker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [JobTracker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [JobTracker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [JobTracker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [JobTracker] SET ARITHABORT OFF 
GO
ALTER DATABASE [JobTracker] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [JobTracker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [JobTracker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [JobTracker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [JobTracker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [JobTracker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [JobTracker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [JobTracker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [JobTracker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [JobTracker] SET  DISABLE_BROKER 
GO
ALTER DATABASE [JobTracker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [JobTracker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [JobTracker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [JobTracker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [JobTracker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [JobTracker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [JobTracker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [JobTracker] SET RECOVERY FULL 
GO
ALTER DATABASE [JobTracker] SET  MULTI_USER 
GO
ALTER DATABASE [JobTracker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [JobTracker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [JobTracker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [JobTracker] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [JobTracker] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [JobTracker] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'JobTracker', N'ON'
GO
ALTER DATABASE [JobTracker] SET QUERY_STORE = OFF
GO
USE [JobTracker]
GO
/****** Object:  Table [dbo].[Job]    Script Date: 01-12-2023 23:10:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Job](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Title] [varchar](max) NULL,
	[CompanyName] [varchar](max) NULL,
	[Location] [varchar](max) NULL,
	[Salary] [varchar](max) NULL,
	[JobKeywords] [nvarchar](max) NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Status] [int] NULL,
	[URL] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
	[LogoUrl] [nvarchar](max) NULL,
	[JobId] [varchar](50) UNIQUE,
 CONSTRAINT [PK_Job] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProviderData]    Script Date: 01-12-2023 23:10:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProviderData](
	[Id] [uniqueidentifier] NOT NULL,
	[ProviderId] [nvarchar](255) NULL,
	[Uid] [nvarchar](255) NULL,
	[DisplayName] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[PhoneNumber] [nvarchar](255) NULL,
	[PhotoURL] [nvarchar](255) NULL,
	[SingleSignOnId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SingleSignOn]    Script Date: 01-12-2023 23:10:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SingleSignOn](
	[Id] [uniqueidentifier] NOT NULL,
	[Uid] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[EmailVerified] [bit] NULL,
	[IsAnonymous] [bit] NULL,
	[PhotoURL] [nvarchar](255) NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[AccessToken] [nvarchar](max) NULL,
	[OauthExpireIn] [int] NULL,
	[ExpiresIn] [int] NULL,
	[RawUserInfo] [nvarchar](max) NULL,
	[Kind] [nvarchar](255) NULL,
	[OperationType] [nvarchar](255) NULL,
	[UserId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 01-12-2023 23:10:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Email] [nvarchar](255) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Job] ADD  CONSTRAINT [DF_Job_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[ProviderData] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[SingleSignOn] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Job]  WITH CHECK ADD  CONSTRAINT [FK_Job_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_Job_User]
GO
ALTER TABLE [dbo].[SingleSignOn]  WITH CHECK ADD  CONSTRAINT [FK_SingleSignOn_User1] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[SingleSignOn] CHECK CONSTRAINT [FK_SingleSignOn_User1]
GO
USE [master]
GO
ALTER DATABASE [JobTracker] SET  READ_WRITE 
GO
