import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
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

// Logo SVG as a component (simplified representation)
const Logo = ({ size = 120 }) => {
  const scale = size / 120;
  return (
    <View style={[styles.logoContainer, { width: size, height: size }]}>
      {/* Center bean shape */}
      <View
        style={[
          styles.logoCenter,
          { width: 20 * scale, height: 25 * scale, borderRadius: 10 * scale },
        ]}
      />
      {/* Petals */}
      <View style={[styles.logoPetal, styles.petalTop, { transform: [{ scale }] }]} />
      <View style={[styles.logoPetal, styles.petalBottom, { transform: [{ scale }] }]} />
      <View style={[styles.logoPetalSide, styles.petalLeft, { transform: [{ scale }] }]} />
      <View style={[styles.logoPetalSide, styles.petalRight, { transform: [{ scale }] }]} />
      {/* Decorative curves */}
      <View style={[styles.curveOuter, styles.curveTopLeft, { borderColor: COLORS.yellow }]} />
      <View style={[styles.curveOuter, styles.curveTopRight, { borderColor: COLORS.yellow }]} />
      <View style={[styles.curveOuter, styles.curveBottomLeft, { borderColor: COLORS.yellow }]} />
      <View style={[styles.curveOuter, styles.curveBottomRight, { borderColor: COLORS.yellow }]} />
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
const CakeCard = ({ name, description, price, delay }) => {
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
          {/* Placeholder for cake image */}
          <View style={styles.cakeImagePlaceholder}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderEmoji}>🎂</Text>
            </View>
            <Text style={styles.placeholderText}>Image Coming Soon</Text>
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

// Sample cake data
const cakes = [
  {
    name: "Classic Vanilla Dream",
    description: "Light and fluffy vanilla sponge with silky buttercream frosting",
    price: "$45",
  },
  {
    name: "Chocolate Paradise",
    description: "Rich dark chocolate layers with ganache and chocolate shavings",
    price: "$55",
  },
  {
    name: "Strawberry Bliss",
    description: "Fresh strawberries with cream cheese frosting on vanilla base",
    price: "$50",
  },
  {
    name: "Caramel Delight",
    description: "Salted caramel drizzle over moist caramel cake layers",
    price: "$52",
  },
  {
    name: "Lemon Zest",
    description: "Tangy lemon curd filling with light meringue frosting",
    price: "$48",
  },
  {
    name: "Red Velvet Romance",
    description: "Classic red velvet with cream cheese frosting and white chocolate",
    price: "$58",
  },
];

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Parallax effect for hero
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
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              transform: [{ translateY: heroTranslateY }],
              opacity: heroOpacity,
            },
          ]}
        >
          <FloatingElement delay={0} duration={4000}>
            <Logo size={140} />
          </FloatingElement>

          <FadeIn delay={300}>
            <View style={styles.brandNameContainer}>
              <Text style={styles.brandNameCrema}>Crema</Text>
              <Text style={styles.brandNameFlora}>Flora</Text>
            </View>
          </FadeIn>

          <FadeIn delay={500}>
            <Text style={styles.tagline}>• By Lucy •</Text>
          </FadeIn>

          <FadeIn delay={700}>
            <Text style={styles.heroSubtitle}>
              Artisan cakes crafted with love and passion
            </Text>
          </FadeIn>

          <FadeIn delay={900}>
            <View style={styles.decorativeLine} />
          </FadeIn>

          <FadeIn delay={1100}>
            <Text style={styles.heroDescription}>
              Every cake tells a story. Let us create yours with the finest
              ingredients and artistic flair that makes each celebration
              unforgettable.
            </Text>
          </FadeIn>

          {/* Decorative Elements */}
          <View style={styles.decorativeElements}>
            <FloatingElement delay={200} duration={3500}>
              <View style={[styles.decorativeCircle, { backgroundColor: COLORS.yellow }]} />
            </FloatingElement>
            <FloatingElement delay={400} duration={4500}>
              <View style={[styles.decorativeCircle, styles.circleRight, { backgroundColor: COLORS.orange }]} />
            </FloatingElement>
          </View>
        </Animated.View>

        {/* Cakes Section */}
        <View style={styles.cakesSection}>
          <FadeIn delay={200}>
            <Text style={styles.sectionTitle}>Our Creations</Text>
            <View style={styles.sectionDivider} />
          </FadeIn>

          <View style={styles.cakesGrid}>
            {cakes.map((cake, index) => (
              <CakeCard
                key={index}
                name={cake.name}
                description={cake.description}
                price={cake.price}
                delay={300 + index * 100}
              />
            ))}
          </View>
        </View>

        {/* How to Order Section */}
        <View style={styles.orderSection}>
          <FadeIn delay={200}>
            <Text style={styles.sectionTitle}>How to Order</Text>
            <View style={[styles.sectionDivider, { backgroundColor: COLORS.white }]} />
          </FadeIn>

          <View style={styles.orderSteps}>
            <OrderStep
              number="1"
              title="Choose Your Cake"
              description="Browse our selection and pick your favorite flavor and design, or let us create something custom just for you."
              delay={300}
            />
            <OrderStep
              number="2"
              title="Contact Us"
              description="Reach out via phone, email, or Instagram to discuss your order details, size, and any special requests."
              delay={450}
            />
            <OrderStep
              number="3"
              title="Confirm & Pay"
              description="We'll send you a quote. A 50% deposit secures your order, with the balance due on pickup."
              delay={600}
            />
            <OrderStep
              number="4"
              title="Enjoy!"
              description="Pick up your cake or have it delivered. Get ready to celebrate with a delicious masterpiece!"
              delay={750}
            />
          </View>

          <FadeIn delay={900}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Get in Touch</Text>
            </TouchableOpacity>
          </FadeIn>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Logo size={60} />
          <Text style={styles.footerBrand}>Crema Flora</Text>
          <Text style={styles.footerTagline}>By Lucy</Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>Made with love in every layer</Text>
          <Text style={styles.footerCopyright}>© 2026 Crema Flora. All rights reserved.</Text>
        </View>
      </Animated.ScrollView>
    </View>
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

  // Logo Styles
  logoContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  logoCenter: {
    backgroundColor: COLORS.orange,
    position: "absolute",
  },
  logoPetal: {
    position: "absolute",
    width: 12,
    height: 35,
    backgroundColor: COLORS.orange,
    borderRadius: 6,
  },
  petalTop: {
    top: 15,
  },
  petalBottom: {
    bottom: 15,
  },
  logoPetalSide: {
    position: "absolute",
    width: 50,
    height: 35,
    backgroundColor: COLORS.yellow,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  petalLeft: {
    left: 5,
    transform: [{ rotate: "-15deg" }],
  },
  petalRight: {
    right: 5,
    transform: [{ rotate: "15deg" }, { scaleX: -1 }],
  },
  curveOuter: {
    position: "absolute",
    width: 30,
    height: 30,
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 15,
  },
  curveTopLeft: {
    top: 20,
    left: 10,
    borderTopColor: COLORS.yellow,
    borderLeftColor: COLORS.yellow,
    transform: [{ rotate: "-45deg" }],
  },
  curveTopRight: {
    top: 20,
    right: 10,
    borderTopColor: COLORS.yellow,
    borderRightColor: COLORS.yellow,
    transform: [{ rotate: "45deg" }],
  },
  curveBottomLeft: {
    bottom: 20,
    left: 10,
    borderBottomColor: COLORS.yellow,
    borderLeftColor: COLORS.yellow,
    transform: [{ rotate: "45deg" }],
  },
  curveBottomRight: {
    bottom: 20,
    right: 10,
    borderBottomColor: COLORS.yellow,
    borderRightColor: COLORS.yellow,
    transform: [{ rotate: "-45deg" }],
  },

  // Hero Section
  heroSection: {
    minHeight: 700,
    paddingTop: Platform.OS === "web" ? 80 : 100,
    paddingBottom: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: COLORS.cream,
    position: "relative",
    overflow: "hidden",
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
