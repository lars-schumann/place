package main

import (
	"fmt"
	"math/rand/v2"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
)

type point struct {
	x   int //x-coord 1-1000
	y   int //y-coord 1-1000
	col int //colour 1-32?
}

type point_in_time struct {
	p point
	t time.Time //time it was placed
}

const (
	cells_x_dim      = 1000
	cells_y_dim      = 1000
	update_keep_time = 2 * time.Second
)

var cells [cells_x_dim][cells_y_dim]int
var cells_updates []point_in_time

func main() {

	for col := range cells {
		for row := range cells[col] {
			cells[col][row] = 1
			if rand.IntN(100) == 0 {
				cells[col][row] = rand.IntN(16)
			}
		}
	}

	app := fiber.New()

	app.Use("/static", static.New("./static"))

	app.Get("/", func(c fiber.Ctx) error {
		return c.Render("./views/index.html", fiber.Map{})
	})

	app.Get("/_cells/dim", func(c fiber.Ctx) error {
		return c.JSON([2]int{cells_x_dim, cells_y_dim})
	})

	app.Get("/_cells/full", func(c fiber.Ctx) error {
		return c.JSON(cells)
	})

	app.Get("/_cells/updates", func(c fiber.Ctx) error {
		var trimmed_updates []point_in_time
		var points_to_send [][3]int
		for _, update := range cells_updates {
			if time.Since(update.t) < update_keep_time {
				trimmed_updates = append(trimmed_updates, update)
				points_to_send = append(points_to_send, [3]int{update.p.x, update.p.y, update.p.col})
			}
		}
		cells_updates = trimmed_updates
		if len(points_to_send) > 0 {
			fmt.Println(points_to_send)
		}
		return c.JSON(points_to_send)
	})

	app.Get("/_cells/:x-:y-:col", func(c fiber.Ctx) error {
		x, _ := strconv.Atoi(c.Params("x"))
		y, _ := strconv.Atoi(c.Params("y"))
		col, _ := strconv.Atoi(c.Params("col"))

		if !(0 <= x && x < cells_x_dim) || !(0 <= y && y < cells_y_dim) || !(0 <= col && col <= 15) {
			return c.JSON(fiber.Map{
				"_message": "nuh uh wrong input buddy",
			})
		}

		cells[x][y] = col
		point_with_time := point_in_time{point{x, y, col}, time.Now()}
		cells_updates = append(cells_updates, point_with_time)

		return c.JSON(fiber.Map{
			"_message": "Cell updated successfully",
			"x":        x,
			"y":        y,
			"col":      col,
		})
	})

	app.Listen(":8181")
}
