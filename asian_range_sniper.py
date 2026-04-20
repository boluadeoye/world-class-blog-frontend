import sys

print("=== SOVEREIGN QUANT V4.4: IMMORTAL EDITION ===")
print("ASSET: EURUSD / GBPUSD | PROTOCOL: MICRO-TRENCHING\n")

try:
    balance = float(input("Current Balance (NGN): "))
    floor = float(input("Current Fail Level (from Dashboard): "))
    usd_ngn = float(input("USD/NGN Rate (e.g., 1570): "))
    
    asian_high = float(input("Asian High: "))
    asian_low = float(input("Asian Low: "))
    h1_atr = float(input("H1 ATR (in Pips): "))
    
    buffer_ngn = balance - floor
    
    # MICRO-TRENCHING RISK: Fixed 1,000 NGN
    risk_ngn = 1000 
    risk_usd = risk_ngn / usd_ngn

    # Lives Calculation
    lives_remaining = int(buffer_ngn / risk_ngn)

    if lives_remaining < 3:
        print("\nCRITICAL: BUFFER TOO LOW FOR SAFE EXECUTION. ABORT.")
        sys.exit(1)

    # Strategy Parameters (1:1.5 RR)
    sl_pips = max(12, h1_atr * 1.5) 
    tp_pips = sl_pips * 1.5 
    entry_offset = 2.0 / 10000 

    # Lot Sizing
    lot_size = risk_usd / (sl_pips * 10)
    lot_size = max(0.01, round(lot_size, 2))

    print(f"\n[ SYSTEM STATUS: ARMED | LIVES REMAINING: {lives_remaining} ]")
    print(f"FIXED RISK: {risk_ngn:.2f} NGN | TARGET: {risk_ngn * 1.5:.2f} NGN")
    print(f"REQUIRED LOT SIZE: {lot_size}")

    print("\n--- ORDER 1: BUY STOP ---")
    print(f"ENTRY: {asian_high + entry_offset:.5f}")
    print(f"SL:    {asian_high + entry_offset - (sl_pips/10000):.5f}")
    print(f"TP:    {asian_high + entry_offset + (tp_pips/10000):.5f}")
    
    print("\n--- ORDER 2: SELL STOP ---")
    print(f"ENTRY: {asian_low - entry_offset:.5f}")
    print(f"SL:    {asian_low - entry_offset + (sl_pips/10000):.5f}")
    print(f"TP:    {asian_low - entry_offset - (tp_pips/10000):.5f}")

    print("\n--- MANDATORY 5-MIN RULE BYPASS ---")
    print("1. Place orders WITHOUT SL/TP at 09:05 WAT.")
    print("2. At 09:15 WAT: Add SL/TP to the triggered order.")
    print("3. At 16:00 WAT: Delete untriggered order.")

except Exception as e:
    print(f"ERROR: {e}")
