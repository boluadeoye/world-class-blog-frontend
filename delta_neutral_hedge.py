import sys

print("=== SOVEREIGN QUANT V5: DELTA-NEUTRAL HEDGE ===")
print("ASSET: EURUSD ONLY | PROTOCOL: 5-MIN ANNIHILATOR\n")

try:
    balance = float(input("Current Balance (NGN): "))
    floor = float(input("Current Floor Level (NGN): "))
    usd_ngn = float(input("USD/NGN Rate (e.g., 1570): "))
    spread_pips = float(input("Current EURUSD Spread in Pips (e.g., 0.8): "))
    
    buffer_ngn = balance - floor
    if buffer_ngn <= 0:
        print("\nCRITICAL: ACCOUNT BUST. NO BUFFER REMAINING.")
        sys.exit()

    # Risk is defined by the cost of the spread, not the market direction
    # We limit the spread cost to 2% of the buffer
    max_spread_cost_ngn = buffer_ngn * 0.02
    max_spread_cost_usd = max_spread_cost_ngn / usd_ngn

    # Calculate Lot Size based on Spread Cost
    # Cost = Spread * 10 * Lot Size * 2 (because we open 2 trades)
    lot_size = max_spread_cost_usd / (spread_pips * 10 * 2)
    lot_size = max(0.01, round(lot_size, 2))

    print(f"\n[ SYSTEM STATUS: HEDGE ARMED | BUFFER: {buffer_ngn:.2f} NGN ]")
    print(f"MAX SPREAD BLEED: {max_spread_cost_ngn:.2f} NGN")
    print(f"REQUIRED LOT SIZE: {lot_size} (Per Leg)\n")

    print("--- EXECUTION PROTOCOL (09:00 WAT) ---")
    print(f"1. Open BUY  {lot_size} Lots at Market Price.")
    print(f"2. Open SELL {lot_size} Lots at Market Price.")
    print("3. SET ALARM FOR 09:15 WAT (15 Minutes).\n")
    
    print("--- EXTRACTION PROTOCOL (09:15 WAT) ---")
    print("1. 5-Minute Rule is now mathematically bypassed.")
    print("2. Close the LOSING trade.")
    print("3. Move Stop Loss of WINNING trade to Entry Price (Break-Even).")
    print("4. Set Take Profit to +20 Pips.")
    print("5. Walk away.")

except ValueError:
    print("LOGIC_ERROR: Invalid numerical input.")
