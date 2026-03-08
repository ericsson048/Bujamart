from datetime import datetime, timedelta, timezone
from threading import Lock


_ATTEMPTS: dict[str, list[datetime]] = {}
_LOCK = Lock()


def _now() -> datetime:
    return datetime.now(timezone.utc)


def check_rate_limit(key: str, max_attempts: int = 8, window_seconds: int = 60) -> bool:
    now = _now()
    window_start = now - timedelta(seconds=window_seconds)

    with _LOCK:
        attempts = _ATTEMPTS.get(key, [])
        attempts = [ts for ts in attempts if ts >= window_start]
        if len(attempts) >= max_attempts:
            _ATTEMPTS[key] = attempts
            return False
        attempts.append(now)
        _ATTEMPTS[key] = attempts
        return True

