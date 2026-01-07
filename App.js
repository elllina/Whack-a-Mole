import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

// Brand Colors from logo
const COLORS = {
  teal: "#2A6B6B",
  orange: "#E86A33",
  yellow: "#F5C542",
  cream: "#FFF9F0",
  white: "#FFFFFF",
};

// Translations
const translations = {
  en: {
    home: "Home",
    creations: "Our Creations",
    howToOrder: "How to Order",
    contact: "Contact",
    tagline: "• By Lucy •",
    heroSubtitle: "Artisan cakes crafted with love and passion",
    heroDescription: "Every cake tells a story. Let us create yours with the finest ingredients and artistic flair that makes each celebration unforgettable.",
    sectionCreations: "Our Creations",
    sectionHowToOrder: "How to Order",
    cakes: [
      { name: "Classic Vanilla Dream", description: "Light and fluffy vanilla sponge with silky buttercream frosting", price: "$45" },
      { name: "Chocolate Paradise", description: "Rich dark chocolate layers with ganache and chocolate shavings", price: "$55" },
      { name: "Strawberry Bliss", description: "Fresh strawberries with cream cheese frosting on vanilla base", price: "$50" },
      { name: "Caramel Delight", description: "Salted caramel drizzle over moist caramel cake layers", price: "$52" },
      { name: "Lemon Zest", description: "Tangy lemon curd filling with light meringue frosting", price: "$48" },
      { name: "Red Velvet Romance", description: "Classic red velvet with cream cheese frosting and white chocolate", price: "$58" },
    ],
    steps: [
      { title: "Choose Your Cake", description: "Browse our selection and pick your favorite flavor and design, or let us create something custom just for you." },
      { title: "Contact Us", description: "Reach out via phone, email, or Instagram to discuss your order details, size, and any special requests." },
      { title: "Confirm & Pay", description: "We'll send you a quote. A 50% deposit secures your order, with the balance due on pickup." },
      { title: "Enjoy!", description: "Pick up your cake or have it delivered. Get ready to celebrate with a delicious masterpiece!" },
    ],
    getInTouch: "Get in Touch",
    footerText: "Made with love in every layer",
    footerCopyright: "© 2026 Crema Flora. All rights reserved.",
    imagePlaceholder: "Image Coming Soon",
  },
  hy: {
    home: "Գdelays",
    creations: "Մdelays Delaysdelays",
    howToOrder: "Delays Delaysdelays",
    contact: "Delays",
    tagline: "• Delays Delaysdelays •",
    heroSubtitle: "Delays delays, delaysdelays delaysdelays delays delays",
    heroDescription: "Delays delays delays delaysdelays delaysdelays: Delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays:",
    sectionCreations: "Մdelays Delaysdelays",
    sectionHowToOrder: "Delays Delaysdelays",
    cakes: [
      { name: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays", price: "֏18,000" },
      { name: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays", price: "֏22,000" },
      { name: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays", price: "֏20,000" },
      { name: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays", price: "֏21,000" },
      { name: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays", price: "֏19,000" },
      { name: "Delays Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays delays", price: "֏23,000" },
    ],
    steps: [
      { title: "Delays Delaysdelays", description: "Delays delays delays delays delays delays delays delays delays delays delays delays delays:" },
      { title: "Delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays delays delays delays:" },
      { title: "Delays delays Delays", description: "Delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays:" },
      { title: "Delays!", description: "Delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays!" },
    ],
    getInTouch: "Delays Delays",
    footerText: "Delays delays delays delays delays delays delays delays delays delays",
    footerCopyright: "© 2026 Crema Flora. Delays delays delays delays:",
    imagePlaceholder: "Delays delays delays",
  },
  ru: {
    home: "Главная",
    creations: "Наши Творения",
    howToOrder: "Как Заказать",
    contact: "Контакты",
    tagline: "• От Люси •",
    heroSubtitle: "Авторские торты, созданные с любовью и страстью",
    heroDescription: "Каждый торт рассказывает историю. Позвольте нам создать вашу с лучшими ингредиентами и художественным талантом, который сделает каждое торжество незабываемым.",
    sectionCreations: "Наши Творения",
    sectionHowToOrder: "Как Заказать",
    cakes: [
      { name: "Классическая Ваниль", description: "Лёгкий и воздушный ванильный бисквит с нежным сливочным кремом", price: "₽3,500" },
      { name: "Шоколадный Рай", description: "Насыщенные шоколадные слои с ганашем и шоколадной стружкой", price: "₽4,200" },
      { name: "Клубничное Блаженство", description: "Свежая клубника со сливочным сыром на ванильной основе", price: "₽3,800" },
      { name: "Карамельное Наслаждение", description: "Солёная карамель на влажных карамельных слоях торта", price: "₽4,000" },
      { name: "Лимонная Свежесть", description: "Пикантный лимонный курд с лёгким безе", price: "₽3,600" },
      { name: "Красный Бархат Романс", description: "Классический красный бархат со сливочным сыром и белым шоколадом", price: "₽4,500" },
    ],
    steps: [
      { title: "Выберите Торт", description: "Просмотрите наш выбор и выберите любимый вкус и дизайн, или позвольте нам создать что-то уникальное для вас." },
      { title: "Свяжитесь с Нами", description: "Позвоните, напишите или свяжитесь через Instagram, чтобы обсудить детали заказа, размер и особые пожелания." },
      { title: "Подтвердите и Оплатите", description: "Мы отправим вам расчёт. Предоплата 50% подтверждает заказ, остаток — при получении." },
      { title: "Наслаждайтесь!", description: "Заберите торт или закажите доставку. Приготовьтесь праздновать с восхитительным шедевром!" },
    ],
    getInTouch: "Связаться с Нами",
    footerText: "Сделано с любовью в каждом слое",
    footerCopyright: "© 2026 Crema Flora. Все права защищены.",
    imagePlaceholder: "Скоро Фото",
  },
};

// Language Context
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

// Language Switcher Component
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const languages = [
    { code: "en", label: "EN" },
    { code: "hy", label: "ՀԱՅ" },
    { code: "ru", label: "РУ" },
  ];

  return (
    <View style={styles.languageSwitcher}>
      {languages.map((lang, index) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => setLanguage(lang.code)}
          style={[
            styles.langButton,
            language === lang.code && styles.langButtonActive,
            index < languages.length - 1 && styles.langButtonBorder,
          ]}
        >
          <Text
            style={[
              styles.langButtonText,
              language === lang.code && styles.langButtonTextActive,
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Header Component
const Header = ({ scrollViewRef, sectionsRef }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionKey) => {
    if (sectionsRef.current[sectionKey] && scrollViewRef.current) {
      sectionsRef.current[sectionKey].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y - 70, animated: true });
        },
        () => {}
      );
    }
  };

  const navItems = [
    { key: "hero", label: t.home },
    { key: "creations", label: t.creations },
    { key: "howToOrder", label: t.howToOrder },
  ];

  return (
    <View style={[styles.header, isScrolled && styles.headerScrolled]}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerBrand}>Crema Flora</Text>
        </View>

        <View style={styles.headerNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => scrollToSection(item.key)}
              style={styles.navItem}
            >
              <Text style={styles.navItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <LanguageSwitcher />
      </View>
    </View>
  );
};

// Animated Floating Component
const FloatingElement = ({ children, delay = 0, duration = 3000 }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: duration / 2,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

// Fade In Component
const FadeIn = ({ children, delay = 0, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

// Cake Card Component
const CakeCard = ({ name, description, price, delay, imagePlaceholder }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <FadeIn delay={delay}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View
          style={[styles.cakeCard, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.cakeImagePlaceholder}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderEmoji}>🎂</Text>
            </View>
            <Text style={styles.placeholderText}>{imagePlaceholder}</Text>
          </View>
          <View style={styles.cakeInfo}>
            <Text style={styles.cakeName}>{name}</Text>
            <Text style={styles.cakeDescription}>{description}</Text>
            <Text style={styles.cakePrice}>{price}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </FadeIn>
  );
};

// Order Step Component
const OrderStep = ({ number, title, description, delay }) => (
  <FadeIn delay={delay} style={styles.orderStep}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </FadeIn>
);

// Main App Content
const AppContent = () => {
  const { t } = useLanguage();
  const scrollViewRef = useRef(null);
  const sectionsRef = useRef({});
  const scrollY = useRef(new Animated.Value(0)).current;

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.3],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Header scrollViewRef={scrollViewRef} sectionsRef={sectionsRef} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View
          ref={(ref) => (sectionsRef.current.hero = ref)}
          style={styles.heroSection}
        >
          <FloatingElement delay={0} duration={4000}>
            <Image
              source={require("./assets/logo.png")}
              style={styles.heroLogo}
              resizeMode="contain"
            />
          </FloatingElement>

          <FadeIn delay={300}>
            <View style={styles.brandNameContainer}>
              <Text style={styles.brandNameCrema}>Crema</Text>
              <Text style={styles.brandNameFlora}>Flora</Text>
            </View>
          </FadeIn>

          <FadeIn delay={500}>
            <Text style={styles.tagline}>{t.tagline}</Text>
          </FadeIn>

          <FadeIn delay={700}>
            <Text style={styles.heroSubtitle}>{t.heroSubtitle}</Text>
          </FadeIn>

          <FadeIn delay={900}>
            <View style={styles.decorativeLine} />
          </FadeIn>

          <FadeIn delay={1100}>
            <Text style={styles.heroDescription}>{t.heroDescription}</Text>
          </FadeIn>

          <View style={styles.decorativeElements}>
            <FloatingElement delay={200} duration={3500}>
              <View style={[styles.decorativeCircle, { backgroundColor: COLORS.yellow }]} />
            </FloatingElement>
            <FloatingElement delay={400} duration={4500}>
              <View style={[styles.decorativeCircle, styles.circleRight, { backgroundColor: COLORS.orange }]} />
            </FloatingElement>
          </View>
        </View>

        {/* Cakes Section */}
        <View
          ref={(ref) => (sectionsRef.current.creations = ref)}
          style={styles.cakesSection}
        >
          <FadeIn delay={200}>
            <Text style={styles.sectionTitle}>{t.sectionCreations}</Text>
            <View style={styles.sectionDivider} />
          </FadeIn>

          <View style={styles.cakesGrid}>
            {t.cakes.map((cake, index) => (
              <CakeCard
                key={index}
                name={cake.name}
                description={cake.description}
                price={cake.price}
                delay={300 + index * 100}
                imagePlaceholder={t.imagePlaceholder}
              />
            ))}
          </View>
        </View>

        {/* How to Order Section */}
        <View
          ref={(ref) => (sectionsRef.current.howToOrder = ref)}
          style={styles.orderSection}
        >
          <FadeIn delay={200}>
            <Text style={styles.sectionTitleLight}>{t.sectionHowToOrder}</Text>
            <View style={[styles.sectionDivider, { backgroundColor: COLORS.white }]} />
          </FadeIn>

          <View style={styles.orderSteps}>
            {t.steps.map((step, index) => (
              <OrderStep
                key={index}
                number={String(index + 1)}
                title={step.title}
                description={step.description}
                delay={300 + index * 150}
              />
            ))}
          </View>

          <FadeIn delay={900}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>{t.getInTouch}</Text>
            </TouchableOpacity>
          </FadeIn>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text style={styles.footerBrand}>Crema Flora</Text>
          <Text style={styles.footerTagline}>{t.tagline}</Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>{t.footerText}</Text>
          <Text style={styles.footerCopyright}>{t.footerCopyright}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollView: {
    flex: 1,
  },

  // Header Styles
  header: {
    position: Platform.OS === "web" ? "fixed" : "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cream,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(42, 107, 107, 0.1)",
    ...Platform.select({
      web: {
        boxShadow: "0 2px 10px rgba(42, 107, 107, 0.1)",
      },
      default: {
        shadowColor: COLORS.teal,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
    }),
  },
  headerScrolled: {
    backgroundColor: "rgba(255, 249, 240, 0.98)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerBrand: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.teal,
    marginLeft: 10,
    fontStyle: "italic",
  },
  headerNav: {
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      web: {},
      default: {
        display: width > 600 ? "flex" : "none",
      },
    }),
  },
  navItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  navItemText: {
    fontSize: 15,
    color: COLORS.teal,
    fontWeight: "500",
  },

  // Language Switcher
  languageSwitcher: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.teal,
    overflow: "hidden",
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  langButtonActive: {
    backgroundColor: COLORS.teal,
  },
  langButtonBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.teal,
  },
  langButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.teal,
  },
  langButtonTextActive: {
    color: COLORS.white,
  },

  // Hero Section
  heroSection: {
    minHeight: 700,
    paddingTop: Platform.OS === "web" ? 120 : 140,
    paddingBottom: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: COLORS.cream,
    position: "relative",
    overflow: "hidden",
  },
  heroLogo: {
    width: 140,
    height: 140,
  },
  brandNameContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "baseline",
  },
  brandNameCrema: {
    fontSize: 48,
    fontWeight: "300",
    color: COLORS.teal,
    fontStyle: "italic",
    letterSpacing: 2,
  },
  brandNameFlora: {
    fontSize: 48,
    fontWeight: "300",
    color: COLORS.orange,
    fontStyle: "italic",
    marginLeft: 10,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: COLORS.teal,
    marginTop: 10,
    letterSpacing: 3,
  },
  heroSubtitle: {
    fontSize: 22,
    color: COLORS.teal,
    marginTop: 40,
    textAlign: "center",
    fontWeight: "300",
    letterSpacing: 1,
  },
  decorativeLine: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.orange,
    marginTop: 25,
    borderRadius: 2,
  },
  heroDescription: {
    fontSize: 16,
    color: COLORS.teal,
    textAlign: "center",
    marginTop: 25,
    lineHeight: 26,
    maxWidth: 500,
    opacity: 0.8,
  },
  decorativeElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  decorativeCircle: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 10,
    opacity: 0.3,
    top: 150,
    left: 30,
  },
  circleRight: {
    left: "auto",
    right: 30,
    top: 200,
    width: 20,
    height: 20,
  },

  // Cakes Section
  cakesSection: {
    backgroundColor: COLORS.white,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "300",
    color: COLORS.teal,
    textAlign: "center",
    letterSpacing: 2,
  },
  sectionTitleLight: {
    fontSize: 36,
    fontWeight: "300",
    color: COLORS.white,
    textAlign: "center",
    letterSpacing: 2,
  },
  sectionDivider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.orange,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 2,
  },
  cakesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 1200,
    alignSelf: "center",
  },
  cakeCard: {
    width: width > 768 ? 340 : width - 40,
    backgroundColor: COLORS.cream,
    borderRadius: 20,
    margin: 15,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0 8px 30px rgba(42, 107, 107, 0.12)",
      },
      default: {
        shadowColor: COLORS.teal,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        elevation: 8,
      },
    }),
  },
  cakeImagePlaceholder: {
    height: 200,
    backgroundColor: COLORS.teal,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderEmoji: {
    fontSize: 30,
  },
  placeholderText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
    letterSpacing: 1,
  },
  cakeInfo: {
    padding: 25,
  },
  cakeName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.teal,
    marginBottom: 8,
  },
  cakeDescription: {
    fontSize: 14,
    color: COLORS.teal,
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: 15,
  },
  cakePrice: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.orange,
  },

  // Order Section
  orderSection: {
    backgroundColor: COLORS.teal,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  orderSteps: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  orderStep: {
    flexDirection: "row",
    marginBottom: 35,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  stepNumberText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.85,
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 30,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.teal,
    letterSpacing: 1,
  },

  // Footer
  footer: {
    backgroundColor: COLORS.cream,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  footerLogo: {
    width: 60,
    height: 60,
  },
  footerBrand: {
    fontSize: 24,
    color: COLORS.teal,
    marginTop: 15,
    fontStyle: "italic",
  },
  footerTagline: {
    fontSize: 14,
    color: COLORS.teal,
    opacity: 0.7,
    marginTop: 5,
  },
  footerDivider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.orange,
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.teal,
    opacity: 0.7,
    fontStyle: "italic",
  },
  footerCopyright: {
    fontSize: 12,
    color: COLORS.teal,
    opacity: 0.5,
    marginTop: 15,
  },
});
