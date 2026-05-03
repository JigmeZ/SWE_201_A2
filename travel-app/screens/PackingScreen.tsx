import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PACKING, PackingItemType } from "../data";

const NAVY = "#1C2D5E";
const RUST = "#C2622D";
const BODY = "#4A4A4A";
const MUTED = "#888888";
const BG = "#FDFCF9";
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DA";
const GREEN = "#2D7A4F";

type PackingItemProps = {
  item: PackingItemType;
  isChecked: boolean;
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
};

function PackingItem({ item, isChecked, onCheck, onDelete }: PackingItemProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isChecked ? 0.5 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isChecked]);

  const panResponder = useRef(
    PanResponder.create({
      // Only start capturing horizontal gestures when the user swipes left.
      onMoveShouldSetPanResponder: (_event, gestureState) =>
        gestureState.dx < -5,
      // Bind the horizontal drag distance directly to the card translation.
      onPanResponderMove: Animated.event([null, { dx: translateX }], {
        useNativeDriver: false,
      }),
      // Delete the item if the left swipe passes the threshold, otherwise snap back.
      onPanResponderRelease: (_event, gestureState) => {
        const currentX = gestureState.dx;

        if (currentX < -80) {
          Animated.timing(translateX, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
          }).start(() => onDelete(item.id));
          return;
        }

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.itemWrapper}>
      <View pointerEvents="none" style={styles.deleteHint}>
        <Ionicons name="trash-outline" size={20} color={WHITE} />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.itemCard,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-400, 0],
                  outputRange: [-400, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.itemTouchArea}
          onPress={() => onCheck(item.id)}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            color={isChecked ? GREEN : RUST}
          />
          <Text style={[styles.itemText, isChecked && styles.itemTextChecked]}>
            {item.item}
          </Text>
          <Ionicons
            name={isChecked ? "checkmark-circle" : "ellipse-outline"}
            size={22}
            color={isChecked ? GREEN : BORDER}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function PackingScreen() {
  const [checked, setChecked] = useState<string[]>([]);
  const [items, setItems] = useState<PackingItemType[]>(PACKING);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0.8)).current;
  const [showSuccess, setShowSuccess] = useState(false);

  const completion = items.length === 0 ? 0 : checked.length / items.length;
  const isComplete = items.length > 0 && checked.length === items.length;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [headerOpacity]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: completion,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [completion, progressAnim]);

  useEffect(() => {
    if (isComplete) {
      successScale.setValue(0.8);
      setShowSuccess(true);
      Animated.spring(successScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      return;
    }

    setShowSuccess(false);
  }, [isComplete, successScale]);

  // Toggle check on tap.
  function handleCheck(id: string) {
    setChecked((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  }

  // Remove an item from both the visible list and the checked state.
  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setChecked((prev) => prev.filter((itemId) => itemId !== id));
  }

  // Confirm and restore the full packing checklist.
  function handleReset() {
    Alert.alert("Reset List", "Restore all packing items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        onPress: () => {
          setItems(PACKING);
          setChecked([]);
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header and progress section */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <Text style={styles.title}>Packing List</Text>
          <Text style={styles.subtitle}>Bhutan Trip · June 2026</Text>

          <View style={styles.progressOuter}>
            <Animated.View
              style={[
                styles.progressInner,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {checked.length} of {items.length} packed
          </Text>
        </Animated.View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="list-outline" size={18} color={RUST} />
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={18} color={GREEN} />
            <Text style={styles.statValue}>{checked.length}</Text>
            <Text style={styles.statLabel}>Packed</Text>
          </View>
        </View>

        {/* Checklist items */}
        <View style={styles.listSection}>
          {items.map((item) => (
            <PackingItem
              key={item.id}
              item={item}
              isChecked={checked.includes(item.id)}
              onCheck={handleCheck}
              onDelete={handleDelete}
            />
          ))}
        </View>

        {/* Completion state and reset action */}
        {showSuccess && (
          <Animated.View
            style={[
              styles.successCard,
              { transform: [{ scale: successScale }] },
            ]}
          >
            <Ionicons name="airplane-outline" size={28} color={GREEN} />
            <Text style={styles.successTitle}>You are ready for Bhutan!</Text>
            <Text style={styles.successText}>Have an amazing trip!</Text>
          </Animated.View>
        )}

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Ionicons name="refresh-outline" size={18} color={RUST} />
          <Text style={styles.resetText}>Reset List</Text>
        </TouchableOpacity>
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
    paddingTop: 18,
    paddingBottom: 28,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  title: {
    color: NAVY,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    color: MUTED,
    fontSize: 13,
  },
  progressOuter: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    backgroundColor: BORDER,
    overflow: "hidden",
  },
  progressInner: {
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
  },
  progressText: {
    marginTop: 8,
    color: MUTED,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    marginTop: 6,
    color: NAVY,
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 4,
    color: MUTED,
    fontSize: 12,
  },
  listSection: {
    marginTop: 12,
    marginBottom: 10,
  },
  itemWrapper: {
    marginBottom: 10,
    position: "relative",
  },
  deleteHint: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 0,
    bottom: 0,
    borderRadius: 12,
    backgroundColor: RUST,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16,
  },
  itemCard: {
    marginHorizontal: 20,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 12,
  },
  itemTouchArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  itemText: {
    flex: 1,
    marginHorizontal: 12,
    color: BODY,
    fontSize: 14,
    lineHeight: 20,
  },
  itemTextChecked: {
    color: MUTED,
    textDecorationLine: "line-through",
  },
  successCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#EAF6EE",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  successTitle: {
    marginTop: 8,
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  successText: {
    marginTop: 4,
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
  },
  resetButton: {
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: RUST,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  resetText: {
    color: RUST,
    fontSize: 14,
    fontWeight: "700",
  },
});
