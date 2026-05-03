import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAVY = "#1C2D5E";
const RUST = "#C2622D";
const BODY = "#4A4A4A";
const MUTED = "#888888";
const BG = "#FDFCF9";
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DA";

type SectionCardProps = {
  title: string;
  icon: string;
  children: ReactNode;
};

function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon as never} size={18} color={RUST} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function AnimationScreen() {
  const fadeOpacity = useRef(new Animated.Value(1)).current;
  const bounceScale = useRef(new Animated.Value(1)).current;
  const slideX = useRef(new Animated.Value(-300)).current;
  const dragPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [fadeVisible, setFadeVisible] = useState(true);
  const [slideVisible, setSlideVisible] = useState(false);

  useEffect(() => {
    Animated.timing(fadeOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeOpacity]);

  const toggleFade = () => {
    const nextVisible = !fadeVisible;
    setFadeVisible(nextVisible);
    Animated.timing(fadeOpacity, {
      toValue: nextVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const triggerBounce = () => {
    Animated.sequence([
      Animated.spring(bounceScale, {
        toValue: 1.3,
        useNativeDriver: true,
      }),
      Animated.spring(bounceScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleSlide = () => {
    const nextVisible = !slideVisible;
    setSlideVisible(nextVisible);
    Animated.timing(slideX, {
      toValue: nextVisible ? 0 : -300,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      // Allow dragging as soon as the touch begins.
      onStartShouldSetPanResponder: () => true,
      // Keep capturing the gesture while the finger moves.
      onMoveShouldSetPanResponder: () => true,
      // Save the current offset before a drag starts.
      onPanResponderGrant: () => {
        dragPosition.setOffset({
          x: (dragPosition.x as any).__getValue(),
          y: (dragPosition.y as any).__getValue(),
        });
        dragPosition.setValue({ x: 0, y: 0 });
      },
      // Bind gesture movement directly to the animated position.
      onPanResponderMove: Animated.event(
        [null, { dx: dragPosition.x, dy: dragPosition.y }],
        {
          useNativeDriver: false,
        },
      ),
      // Spring the card back to the origin when the drag ends.
      onPanResponderRelease: () => {
        dragPosition.flattenOffset();
        Animated.spring(dragPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen header */}
        <Text style={styles.title}>Animations</Text>
        <Text style={styles.subtitle}>Interactive demos</Text>

        {/* Fade demo */}
        <SectionCard title="Fade" icon="eye-outline">
          <View style={styles.demoBox}>
            {fadeVisible ? (
              <Animated.View
                style={[styles.demoInner, { opacity: fadeOpacity }]}
              >
                <Ionicons name="image-outline" size={50} color={RUST} />
              </Animated.View>
            ) : (
              <Animated.View
                style={[styles.demoInner, { opacity: fadeOpacity }]}
              >
                <Ionicons name="image-outline" size={50} color={RUST} />
              </Animated.View>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleFade}>
            <Ionicons name="eye-outline" size={16} color={WHITE} />
            <Text style={styles.buttonText}>Toggle Fade</Text>
          </TouchableOpacity>
        </SectionCard>

        {/* Bounce demo */}
        <SectionCard title="Bounce" icon="sparkles-outline">
          <View style={styles.demoBox}>
            <Animated.View
              style={[
                styles.demoInner,
                { transform: [{ scale: bounceScale }] },
              ]}
            >
              <Ionicons name="briefcase-outline" size={60} color={RUST} />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={triggerBounce}>
            <Ionicons name="sparkles-outline" size={16} color={WHITE} />
            <Text style={styles.buttonText}>Bounce!</Text>
          </TouchableOpacity>
        </SectionCard>

        {/* Slide demo */}
        <SectionCard title="Slide" icon="map-outline">
          <View style={styles.demoBox}>
            <Animated.View
              style={[
                styles.slideCard,
                { transform: [{ translateX: slideX }] },
              ]}
            >
              <Ionicons name="map-outline" size={50} color={RUST} />
              <Text style={styles.slideLabel}>Paro Taktsang</Text>
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleSlide}>
            <Ionicons name="refresh-outline" size={16} color={WHITE} />
            <Text style={styles.buttonText}>Slide In / Reset</Text>
          </TouchableOpacity>
        </SectionCard>

        {/* Drag demo */}
        <SectionCard title="Drag" icon="move-outline">
          <View style={styles.dragArea}>
            <Animated.View
              style={[
                styles.dragCard,
                { transform: dragPosition.getTranslateTransform() },
              ]}
              {...panResponder.panHandlers}
            >
              <Ionicons name="move-outline" size={40} color={RUST} />
              <Text style={styles.dragText}>Drag me around</Text>
            </Animated.View>
          </View>
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    color: NAVY,
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 18,
    color: MUTED,
    fontSize: 13,
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    marginLeft: 8,
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
  },
  demoBox: {
    backgroundColor: "#FDF0EA",
    borderRadius: 12,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  demoInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 14,
  },
  buttonText: {
    marginLeft: 8,
    color: WHITE,
    fontSize: 14,
    fontWeight: "700",
  },
  slideCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  slideLabel: {
    marginTop: 8,
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
  },
  dragArea: {
    height: 160,
    justifyContent: "center",
  },
  dragCard: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF0EA",
    borderRadius: 12,
    paddingVertical: 22,
  },
  dragText: {
    marginTop: 8,
    color: NAVY,
    fontSize: 13,
    fontWeight: "700",
  },
});
