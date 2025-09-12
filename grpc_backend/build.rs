fn main() -> Result<(), Box<dyn std::error::Error>> {
    let proto_base_path = "../proto/xq";
    tonic_prost_build::configure()
        .build_server(true)
        .build_client(false)
        .out_dir("src")
        .compile_protos(
            &[format!("{}/core.proto", proto_base_path)],
            &[format!("{}", proto_base_path)],
        )?;
    Ok(())
}
