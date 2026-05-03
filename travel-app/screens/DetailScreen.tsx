import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { SlotType } from "../data";

const NAVY = "#1C2D5E";
const RUST = "#C2622D";
const BODY = "#4A4A4A";
const MUTED = "#888888";
const BG = "#FDFCF9";
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DA";

type Props = {
  route: RouteProp<RootStackParamList, "Detail">;
};

type SlotCardProps = {
  slot: SlotType;
  index: number;
};

function SlotCard({ slot, index }: SlotCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 450,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View
      style={[styles.slotCard, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.slotCardAccent} />
      <View style={styles.slotCardBody}>
        <View style={styles.slotTopRow}>
          <View style={styles.slotPeriodRow}>
            <Ionicons name="time-outline" size={14} color={RUST} />
            <Text style={styles.slotPeriod}>{slot.period}</Text>
          </View>
          <Text style={styles.slotTime}>{slot.time}</Text>
        </View>
        <Text style={styles.slotNote}>{slot.note}</Text>
      </View>
    </Animated.View>
  );
}

export default function DetailScreen({ route }: Props) {
  const { day } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Day overview */}
        <View style={styles.topSection}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>{`Day ${day.id}`}</Text>
          </View>
          <Text style={styles.title}>{day.title}</Text>
          <Text style={styles.description}>{day.description}</Text>
          <View style={styles.divider} />
        </View>

        {/* Schedule section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={18} color={RUST} />
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
        </View>

        {/* Slot cards */}
        {day.slots.map((slot, index) => (
          <SlotCard
            key={`${day.id}-${slot.period}`}
            slot={slot}
            index={index}
          />
        ))}

        {/* Travel tip */}
        <View style={styles.tipCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb-outline" size={20} color={RUST} />
            <Text style={styles.tipText}>
              Dress modestly when visiting dzongs. Carry your permit at all
              times in Bhutan.
            </Text>
          </View>
        </View>
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
    paddingBottom: 28,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 18,
  },
  dayBadge: {
    backgroundColor: RUST,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  dayBadgeText: {
    color: WHITE,
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    marginTop: 14,
    color: NAVY,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    marginTop: 8,
    color: MUTED,
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
  },
  slotCard: {
    flexDirection: "row",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  slotCardAccent: {
    width: 3,
    backgroundColor: RUST,
    borderRadius: 0,
    marginRight: 12,
  },
  slotCardBody: {
    flex: 1,
  },
  slotTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotPeriodRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  slotPeriod: {
    marginLeft: 6,
    color: NAVY,
    fontWeight: "800",
    fontSize: 13,
  },
  slotTime: {
    color: MUTED,
    fontSize: 12,
  },
  slotNote: {
    marginTop: 10,
    color: BODY,
    fontSize: 13,
    lineHeight: 19,
  },
  tipCard: {
    backgroundColor: "#FDF0EA",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    color: RUST,
    fontSize: 13,
    lineHeight: 19,
  },
});
