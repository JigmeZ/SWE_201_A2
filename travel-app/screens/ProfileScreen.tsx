import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
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

type StatCardProps = {
  icon: string;
  value: number;
  label: string;
};

type SettingRowProps = {
  icon: string;
  label: string;
  hasSwitch: boolean;
  value?: boolean;
  onToggle?: () => void;
};

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as never} size={22} color={RUST} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  hasSwitch,
  value,
  onToggle,
}: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as never} size={18} color={RUST} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {hasSwitch ? (
        <Switch
          value={Boolean(value)}
          onValueChange={onToggle}
          trackColor={{ false: BORDER, true: RUST }}
          thumbColor={WHITE}
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color={MUTED} />
      )}
    </View>
  );
}

export default function ProfileScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-18)).current;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile header */}
          <View style={styles.topSection}>
            <Ionicons name="person-circle-outline" size={90} color={RUST} />
            <Text style={styles.name}>Jigme Ngawang Chogyal</Text>
            <Text style={styles.tagline}>
              Explorer
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatCard icon="airplane-outline" value={10} label="Trips" />
            <StatCard icon="map-outline" value={20} label="Dzongkhags" />
            <StatCard icon="calendar-outline" value={35} label="Days" />
          </View>

          {/* Preferences */}
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingsCard}>
            <SettingRow
              icon="notifications-outline"
              label="Notifications"
              hasSwitch
              value={notificationsEnabled}
              onToggle={() => setNotificationsEnabled((current) => !current)}
            />
            <SettingRow
              icon="moon-outline"
              label="Dark Mode"
              hasSwitch
              value={darkModeEnabled}
              onToggle={() => setDarkModeEnabled((current) => !current)}
            />
            <SettingRow
              icon="information-circle-outline"
              label="About App"
              hasSwitch={false}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  topSection: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  name: {
    marginTop: 4,
    color: NAVY,
    fontSize: 22,
    fontWeight: "800",
  },
  tagline: {
    marginTop: 4,
    color: MUTED,
    fontSize: 13,
    fontStyle: "italic",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    marginTop: 8,
    color: NAVY,
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 4,
    color: MUTED,
    fontSize: 12,
  },
  sectionTitle: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  settingLabel: {
    marginLeft: 10,
    color: BODY,
    fontSize: 14,
    fontWeight: "600",
  },
});
