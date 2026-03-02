def get_escapes(text):
    return "".join(f"\\u{ord(c):04x}" if ord(c) > 127 else c for c in text)

texts = {
    "langToggle": "አማርኛ",
    "blogTitle": "የሴቶች ታሪኮች",
    "latestStories": "የቅርብ ጊዜ አነቃቂ ታሪኮች",
    "readFull": "ሙሉ ታሪኩን አንብብ →",
    "backToStories": "ወደ ታሪኮች ተመለስ",
    "loading": "ታሪኩ በመጫን ላይ ነው...",
    "backBtn": "← ተመለስ"
}

for k, v in texts.items():
    print(f"{k}: {get_escapes(v)}")
