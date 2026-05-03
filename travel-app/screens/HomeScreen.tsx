import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DAYS, DayType, TRIP } from "../data";

const NAVY = "#1C2D5E";
const RUST = "#C2622D";
const BODY = "#4A4A4A";
const MUTED = "#888888";
const BG = "#FDFCF9";
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DA";

type Props = {
  navigation: any;
};

type MetaFieldProps = {
  label: string;
  value: string;
};

type TimeSlotProps = {
  period: string;
  time: string;
  note: string;
  delay: number;
};

type DayCardProps = {
  day: DayType;
  index: number;
};

function MetaField({ label, value }: MetaFieldProps) {
  return (
    <View style={styles.metaField}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
      <View style={styles.metaUnderline} />
    </View>
  );
}

// Animated itinerary slot row
function TimeSlot({ period, time, note, delay }: TimeSlotProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View
      style={[styles.slotRow, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.slotLeft}>
        <View style={styles.slotDot} />
        <Text style={styles.slotPeriod}>{period}</Text>
        <Text style={styles.slotTime}>{time}</Text>
      </View>
      <Text style={styles.slotNote}>{note}</Text>
    </Animated.View>
  );
}

// Day summary card with staggered schedule slots
function DayCard({ day, index }: DayCardProps) {
  return (
    <View style={styles.dayCard}>
      <Text
        style={styles.dayTitle}
      >{`DAY ${day.id} - ${day.title.toUpperCase()}`}</Text>
      <View style={styles.divider} />
      {day.slots.map((slot, slotIndex) => (
        <TimeSlot
          key={`${day.id}-${slot.period}`}
          period={slot.period}
          time={slot.time}
          note={slot.note}
          delay={index * 150 + slotIndex * 100}
        />
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [headerOpacity]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <Text style={styles.travelText}>Travel</Text>
          <Text style={styles.itineraryText}>ITINERARY</Text>
        </Animated.View>

        {/* Trip metadata */}
        <View style={styles.metaGrid}>
          <MetaField label="Destination" value={TRIP.destination} />
          <MetaField label="Duration" value={TRIP.duration} />
          <MetaField label="Date" value={TRIP.date} />
          <MetaField label="Departure" value={TRIP.departure} />
        </View>

        {/* Day cards */}
        <View style={styles.scheduleList}>
          {DAYS.map((day, index) => (
            <DayCard key={day.id} day={day} index={index} />
          ))}
        </View>

        {/* Navigation button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.buttonText}>View Full Schedule</Text>
          <Ionicons name="arrow-forward" size={18} color={WHITE} />
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
    padding: 20,
    paddingBottom: 28,
  },
  header: {
    alignItems: "center",
    marginBottom: 22,
  },
  travelText: {
    fontSize: 36,
    fontStyle: "italic",
    color: RUST,
    fontWeight: "700",
  },
  itineraryText: {
    marginTop: 4,
    fontSize: 18,
    color: NAVY,
    fontWeight: "800",
    letterSpacing: 6,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metaField: {
    width: "48%",
    marginBottom: 16,
  },
  metaLabel: {
    color: NAVY,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  metaValue: {
    color: BODY,
    fontSize: 12,
    lineHeight: 17,
  },
  metaUnderline: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  scheduleList: {
    marginTop: 4,
  },
  dayCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dayTitle: {
    color: NAVY,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginTop: 10,
    marginBottom: 12,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  slotLeft: {
    width: 110,
    paddingRight: 12,
  },
  slotDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: RUST,
    marginBottom: 8,
  },
  slotPeriod: {
    color: NAVY,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  slotTime: {
    color: MUTED,
    fontSize: 12,
    marginTop: 3,
  },
  slotNote: {
    flex: 1,
    color: BODY,
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NAVY,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 8,
  },
  buttonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "700",
    marginRight: 8,
  },
});
