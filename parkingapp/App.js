import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// --- 1. HEADER COMPONENT ---
const Header = () => (
  <View style={styles.header}>
    <View>
      <Text style={styles.greeting}>Good morning 👋</Text>
      <Text style={styles.username}>Find your spot</Text>
    </View>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>JD</Text>
    </View>
  </View>
);

// --- 2. SEARCH BAR COMPONENT ---
const SearchBar = ({ value, onChange }) => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchIcon}>🔍</Text>
    <TextInput
      style={styles.searchInput}
      placeholder="Search location..."
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChange}
    />
  </View>
);

// --- 3. NEARBY SPOTS COMPONENT ---
const spots = [
  { id: '1', name: 'Bbsm Parking', distance: '0.3 km', available: 12, price: '$2/hr', status: 'open' },
  { id: '2', name: 'Bhat Bhateni Car Parking', distance: '0.7 km', available: 3, price: '$1.5/hr', status: 'filling' },
  { id: '3', name: 'Alfa Beta Parking', distance: '1.1 km', available: 0, price: '$1/hr', status: 'full' },
  { id: '4', name: 'EyePlex Mall Parking Lot', distance: '1.4 km', available: 28, price: '$2.5/hr', status: 'open' },
];

const statusColor = { open: '#22c55e', filling: '#f59e0b', full: '#ef4444' };
const statusLabel = { open: 'Available', filling: 'Filling Up', full: 'Full' };

const SpotCard = ({ spot, onReserve }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View style={{ flex: 1 }}>
        <Text style={styles.spotName}>{spot.name}</Text>
        <Text style={styles.spotDistance}>{spot.distance} away</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColor[spot.status] + '20' }]}>
        <View style={[styles.statusDot, { backgroundColor: statusColor[spot.status] }]} />
        <Text style={[styles.statusText, { color: statusColor[spot.status] }]}>
          {statusLabel[spot.status]}
        </Text>
      </View>
    </View>

    <View style={styles.cardBottom}>
      <View style={styles.cardInfo}>
        <Text style={styles.infoLabel}>Spaces</Text>
        <Text style={styles.infoValue}>{spot.available}</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.infoLabel}>Price</Text>
        <Text style={styles.infoValue}>{spot.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.reserveBtn, spot.status === 'full' && styles.reserveBtnDisabled]}
        onPress={() => spot.status !== 'full' && onReserve(spot)}
        disabled={spot.status === 'full'}
      >
        <Text style={styles.reserveBtnText}>
          {spot.status === 'full' ? 'Full' : 'Reserve'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const NearbySpots = ({ search, onReserve }) => {
  const filtered = spots.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Parking</Text>
        <Text style={styles.sectionCount}>{filtered.length} found</Text>
      </View>
      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No spots match your search.</Text>
      ) : (
        filtered.map(spot => (
          <SpotCard key={spot.id} spot={spot} onReserve={onReserve} />
        ))
      )}
    </View>
  );
};

// --- 4. QUICK STATS COMPONENT ---
const QuickStats = () => (
  <View style={styles.statsRow}>
    {[
      { icon: '🅿️', label: 'Available', value: '43' },
      { icon: '⏱️', label: 'Avg. Wait', value: '4 min' },
      { icon: '💰', label: 'From', value: '$1/hr' },
    ].map((stat, i) => (
      <View key={i} style={styles.statBox}>
        <Text style={styles.statIcon}>{stat.icon}</Text>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    ))}
  </View>
);

// --- MAIN SCREEN ---
export default function ParkingFinderHome() {
  const [search, setSearch] = useState('');
  const [reserved, setReserved] = useState(null);

  const handleReserve = (spot) => {
    setReserved(spot);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <SearchBar value={search} onChange={setSearch} />
        <QuickStats />

        {reserved && (
          <View style={styles.reservedBanner}>
            <Text style={styles.reservedText}>
              ✅ Reserved: <Text style={{ fontWeight: '700' }}>{reserved.name}</Text>
            </Text>
            <TouchableOpacity onPress={() => setReserved(null)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <NearbySpots search={search} onReserve={handleReserve} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },

  // Reserved Banner
  reservedBanner: {
    backgroundColor: '#dcfce7',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  reservedText: {
    fontSize: 14,
    color: '#15803d',
    flex: 1,
  },
  cancelText: {
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '600',
  },

  // Section
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  sectionCount: {
    fontSize: 13,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 24,
    fontSize: 14,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  spotName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  spotDistance: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardInfo: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginTop: 2,
  },
  reserveBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  reserveBtnDisabled: {
    backgroundColor: '#d1d5db',
  },
  reserveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
