use chrono::{DateTime, FixedOffset, TimeZone, Utc};
use prost_types::Timestamp;
use sea_orm::prelude::DateTimeWithTimeZone;

fn chrono_to_ts(dt: DateTimeWithTimeZone) -> Timestamp {
    Timestamp {
        seconds: dt.timestamp(),
        nanos: dt.timestamp_subsec_nanos() as i32,
    }
}

fn ts_to_chrono(ts: Option<Timestamp>) -> DateTimeWithTimeZone {
    let ts = ts.unwrap_or(Timestamp {
        seconds: 0,
        nanos: 0,
    });

    let utc_dt = Utc.timestamp_opt(ts.seconds, ts.nanos as u32).unwrap();
    DateTime::<FixedOffset>::from(utc_dt)
}

// User Model -> PB
impl From<crate::models::entities::users::Model> for crate::xq::User {
    fn from(m: crate::models::entities::users::Model) -> Self {
        Self {
            id: m.id as u64,
            username: m.username,
            display_name: m.display_name,
            bio: m.bio,
            avatar_url: m.avatar_url,
            created_at: Some(chrono_to_ts(m.created_at)),
            updated_at: Some(chrono_to_ts(m.updated_at)),
        }
    }
}

// PB -> ActiveModel（新規作成例）
impl From<crate::xq::User> for crate::models::entities::users::ActiveModel {
    fn from(p: crate::xq::User) -> Self {
        use sea_orm::Set;
        Self {
            id: Set(p.id as i64),
            username: Set(p.username),
            display_name: Set(p.display_name),
            bio: Set(p.bio),
            avatar_url: Set(p.avatar_url),
            created_at: Set(ts_to_chrono(p.created_at)),
            updated_at: Set(ts_to_chrono(p.updated_at)),
        }
    }
}
