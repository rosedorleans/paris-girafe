<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9c44cefcdc04081dce53a5f8e6c00e95
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Vote\\' => 5,
        ),
        'U' => 
        array (
            'User\\' => 5,
        ),
        'T' => 
        array (
            'Tools\\' => 6,
        ),
        'B' => 
        array (
            'Bet\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Vote\\' => 
        array (
            0 => __DIR__ . '/../..' . '/object/vote',
        ),
        'User\\' => 
        array (
            0 => __DIR__ . '/../..' . '/object/user',
        ),
        'Tools\\' => 
        array (
            0 => __DIR__ . '/../..' . '/tools',
        ),
        'Bet\\' => 
        array (
            0 => __DIR__ . '/../..' . '/object/bet',
        ),
    );

    public static $classMap = array (
        'Bet\\Bet' => __DIR__ . '/../..' . '/object/Bet/Bet.php',
        'Bet\\BetController' => __DIR__ . '/../..' . '/object/Bet/BetController.php',
        'Bet\\BetDatabase' => __DIR__ . '/../..' . '/object/Bet/BetDatabase.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'User\\User' => __DIR__ . '/../..' . '/object/User/User.php',
        'User\\UserController' => __DIR__ . '/../..' . '/object/User/UserController.php',
        'User\\UserDatabase' => __DIR__ . '/../..' . '/object/User/UserDatabase.php',
        'Vote\\Vote' => __DIR__ . '/../..' . '/object/Vote/Vote.php',
        'Vote\\VoteController' => __DIR__ . '/../..' . '/object/Vote/VoteController.php',
        'Vote\\VoteDatabase' => __DIR__ . '/../..' . '/object/Vote/VoteDatabase.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9c44cefcdc04081dce53a5f8e6c00e95::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9c44cefcdc04081dce53a5f8e6c00e95::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit9c44cefcdc04081dce53a5f8e6c00e95::$classMap;

        }, null, ClassLoader::class);
    }
}
