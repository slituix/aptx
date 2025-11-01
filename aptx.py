#!/usr/bin/env python3
import subprocess
import typer
from rich.console import Console
from rich.spinner import Spinner
from rich.live import Live
from rich.text import Text
from rich.panel import Panel

app = typer.Typer(help="A beautiful wrapper around apt for Termux ✨")
console = Console()


def run_command(cmd: list[str]):
    process = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True
    )

    with Live(
        Spinner("material", text="Running command..."), refresh_per_second=10
    ) as live:
        for line in process.stdout:
            line = line.strip()
            if line:
                # Update spinner text dynamically
                live.update(Spinner("material", text=line[:80]))

    process.wait()

    if process.returncode == 0:
        console.print("\n[bold green]Completed successfully![/bold green]")
    else:
        console.print("\n[bold red]Command failed.[/bold red]")


@app.command()
def update():
    """Update package lists"""
    console.print(Panel("[cyan]Running: apt update[/cyan]", title="APT", expand=False))
    run_command(["apt", "update", "-y"])


@app.command()
def upgrade():
    """Upgrade installed packages"""
    console.print(
        Panel("[magenta]Running: apt upgrade[/magenta]", title="APT", expand=False)
    )
    # Automatically confirm "yes"
    run_command(["apt", "upgrade", "-y"])


@app.command()
def install(pkg: str):
    """Install a package"""
    console.print(
        Panel(f"[yellow]Installing: {pkg}[/yellow]", title="APT", expand=False)
    )
    run_command(["apt", "install", "-y", pkg])


@app.command()
def search(pkg: str):
    """Search for a package"""
    console.print(
        Panel(f"[blue]Searching for: {pkg}[/blue]", title="APT", expand=False)
    )
    run_command(["apt", "search", pkg])


@app.command()
def autoremove():
    """Remove unnecessary packages"""
    console.print(Panel("[red]Running autoremove[/red]", title="APT", expand=False))
    run_command(["apt", "autoremove", "-y"])


@app.command()
def clean():
    """Clean package cache"""
    console.print(
        Panel("[green]Cleaning up package cache[/green]", title="APT", expand=False)
    )
    run_command(["apt", "clean"])


if __name__ == "__main__":
    app()
  
