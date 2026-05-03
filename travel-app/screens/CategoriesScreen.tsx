import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DAYS, DayType } from "../data";

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

type DayItemProps = {
  item: DayType;
  index: number;
  navigation: any;
};

function DayItem({ item, index, navigation }: DayItemProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 420,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateX]);

  return (
    <Animated.View
      style={[styles.cardWrap, { opacity, transform: [{ translateX }] }]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Detail", { day: item })}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{`Day ${item.id}`}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.titleRow}>
            <Ionicons name="location-outline" size={14} color={RUST} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.titleRow}>
            <Ionicons name="time-outline" size={14} color={MUTED} />
            <Text style={styles.timeText}>2 stops</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={MUTED} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function CategoriesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen header */}
        <Text style={styles.header}>Bhutan Journey</Text>
        <Text style={styles.subtitle}>5 days · 4 destinations</Text>
        {/* Day list */}
        <FlatList
          scrollEnabled={false}
          data={DAYS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <DayItem item={item} index={index} navigation={navigation} />
          )}
        />
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
    paddingVertical: 20,
    paddingBottom: 30,
  },
  header: {
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: "800",
    color: NAVY,
  },
  subtitle: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 18,
    color: MUTED,
    fontSize: 13,
  },
  cardWrap: {
    marginBottom: 12,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: RUST,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 14,
  },
  badgeText: {
    color: WHITE,
    fontWeight: "700",
    fontSize: 12,
  },
  cardBody: {
    flex: 1,
    paddingRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 6,
    color: NAVY,
    fontWeight: "700",
    fontSize: 14,
    flexShrink: 1,
  },
  description: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
    lineHeight: 17,
  },
  timeText: {
    marginLeft: 6,
    color: MUTED,
    fontSize: 12,
  },
});
